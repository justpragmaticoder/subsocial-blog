import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { IPFSContentEntity } from './entity/ipfs-content.entity';
import { Injectable, Logger } from '@nestjs/common';
import { ICreateIPFSContentInput, IIPFSContent, IIPFSContentForSync } from './interfaces';
import { IPFSConfigService } from '../../../libs/config/src/ipfs';
import { PostService } from '../post/post-service';
import { SubsocialApi } from '@subsocial/api';
import { IPost } from '../post/interfaces';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@Injectable()
export class IPFSContentService extends TypeOrmQueryService<IPFSContentEntity> {
  private readonly logger = new Logger(IPFSContentService.name);
  /**
   * So small value for test purposes only
   */
  private readonly DEFAULT_LIMIT = 1;

  constructor(
    @InjectRepository(IPFSContentEntity) repo: Repository<IPFSContentEntity>,
    private readonly ipfsConfigService: IPFSConfigService,
    private readonly postService: PostService,
  ) {
    super(repo);
  }

  public async syncContent(): Promise<void> {
    const apiClient: SubsocialApi = await this.getSubSocialApiClient();
    let totalCount;
    let syncedPostCounter = 0;

    do {
      try {
        let syncedContentIds: string[] = [];
        let folderCid;
        const contentSearchResult = await this.postService.findPostsBySimplifiedSearch({
          searchConditions: { syncedBlock: null },
          offset: syncedPostCounter,
          limit: this.DEFAULT_LIMIT
        });

        if (!contentSearchResult.node.length) {
          this.logger.log(`[${this.syncContent.name}] There is no content to be synchronized.`);
          return;
        }

        const posts: string[] = (contentSearchResult.node ?? []).map((post) => {
          const preparedPost: IIPFSContentForSync = { title: post.title, body: post.body, image: post.image, tags: post.tags };

          return JSON.stringify(preparedPost);
        });

        totalCount = contentSearchResult.totalCount ?? totalCount;
        syncedPostCounter += posts.length;

        for await (const result of apiClient.ipfs.client.addAll(posts, { wrapWithDirectory: true })) {
          if (result.path !== '') {
            syncedContentIds.push(result.cid.toString())
          } else {
            folderCid = result.cid.toString()
          }
        }

        const substrateApi = await apiClient.substrateApi;
        const blockStruct = await substrateApi.rpc.chain.getHeader();
        const block = blockStruct.number.toString();

        await this.saveSyncedIPFSContent({
          content: contentSearchResult.node,
          syncedContentIds,
          block,
          folderCid,
        });
      } catch (error) {
        this.logger.error(error);
      }
    } while (syncedPostCounter < totalCount)
  }

  private async getSubSocialApiClient(): Promise<SubsocialApi> {
    let apiClient: SubsocialApi;
    try {
      const config = this.ipfsConfigService.options;
      apiClient = await SubsocialApi.create({
        substrateNodeUrl: config.substrateNodeUrl,
        ipfsNodeUrl: config.ipfsNodeUrl,
      });
      apiClient.ipfs.setWriteHeaders({
        authorization: `Basic ${config.ipfsAuthToken}`,
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }

    return apiClient;
  }

  private async saveSyncedIPFSContent(input: {
    content: IPost[],
    syncedContentIds: string[],
    block: string;
    folderCid: string;
  }) {
    const { block, folderCid } = input;
    if (!input.folderCid || !input.block) {
      const errorMessage = `[${this.saveSyncedIPFSContent.name}] folderCid or block parameter is absent: block:${input.block}, folderCid:${input.folderCid}`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();

    try {
      await this.createIPFSContentIfNotExist({ block, folderCid });
      await this.updateContentWithSyncIdentifiers(input);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(error);
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }

  private async updateContentWithSyncIdentifiers(input: {
    content: IPost[],
    syncedContentIds: string[],
    block: string;
  }): Promise<UpdateResult[]> {
    const { content, syncedContentIds, block } = input;
    const promises: Promise<UpdateResult>[] = [];

    for (let index = 0; index < content.length; index++) {
      const currentPost = content[index];
      const currentSyncedContentId = syncedContentIds[index];

      promises.push(this.postService.repo.update({
        id: currentPost.id
      }, {
        syncedBlock: block,
        syncedContentId: currentSyncedContentId
      }));
    }

    return Promise.all(promises);
  }

  public async createIPFSContentIfNotExist(input: ICreateIPFSContentInput): Promise<IIPFSContent | null> {
    const targetIPFSContentCount: number = await this.repo.count({ block: input.block, folderCid: input.folderCid });

    if (targetIPFSContentCount > 0) {
      return null;
    }

    return this.createOne(input);
  }
}
