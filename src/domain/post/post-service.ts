import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Filter } from '@nestjs-query/core';
import { Repository } from 'typeorm';
import { FindPostsInput } from './inputs/find-posts.input';
import { ICreatePostInput, IFindPostsInternalInput, IFindPostsResponse, IPost } from './interfaces';
import { PostDto } from './dto/post.dto';
import { Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

@Injectable()
export class PostService extends TypeOrmQueryService<PostEntity> {
  constructor(@InjectRepository(PostEntity) repo: Repository<PostEntity>) {
    super(repo);
  }

  async findPosts(query: FindPostsInput): Promise<IFindPostsResponse> {
    const filter: Filter<PostDto> = query.filter;
    const { offset = 0, limit = 10 } = query.paging ?? {};

    const [total, posts]: [number, PostDto[]] = await Promise.all([
      this.count(filter),
      this.query({ ...query, ...{ filter } }),
    ]);

    return {
      offset,
      limit,
      totalCount: total,
      node: posts,
    }
  }

  async findPostsBySimplifiedSearch(input: IFindPostsInternalInput): Promise<IFindPostsResponse> {
    const { limit = 10, offset = 0 } = input;
    const searchConditions: FindManyOptions<PostEntity> = {
      where: input.searchConditions,
      skip: offset,
      take: limit,
    };
    const [entities, totalCount]:[PostEntity[], number] = await this.repo.findAndCount(searchConditions);

    return {
      offset,
      limit,
      totalCount,
      node: entities,
    }
  }

  async createPost(input: ICreatePostInput): Promise<IPost> {
    return this.createOne({ ...input, ...input.content });
  }
}
