import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IPFSContentService } from '../ipfs-content.service';

@Injectable()
export class IPFSCronService {
  private readonly logger = new Logger(IPFSCronService.name);

  constructor(
    private readonly ipfsContentService: IPFSContentService,
  ) {}

  @Cron('*/12 * * * * *')
  async syncContent(): Promise<void> {
    const startAt = Date.now();
    this.logger.log(`[${this.syncContent.name}] Started to sync content...`);

    await this.ipfsContentService.syncContent();

    const endAt = Date.now();
    const duration = endAt - startAt;
    this.logger.log(`[${this.syncContent.name}] Content has been synced with IPFS in ${duration} ms...`);
  }
}
