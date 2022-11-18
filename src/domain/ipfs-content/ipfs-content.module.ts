import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { IPFSContentEntity } from './entity/ipfs-content.entity';
import { IPFSContentService } from './ipfs-content.service';
import { IPFSContentDto } from './dto/ipfs-content.dto';
import { IPFSCronService } from './cron/ipfs-cron.service';
import { IPFSConfigModule } from '../../../libs/config/src/ipfs';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        IPFSConfigModule,
        PostModule,
        NestjsQueryTypeOrmModule.forFeature([IPFSContentEntity])],
      services: [IPFSContentService],
      resolvers: [
        {
          DTOClass: IPFSContentDto,
          ServiceClass: IPFSContentService,
        }
      ]
    }),
  ],
  providers: [IPFSContentService, IPFSCronService],
  exports: [IPFSContentService, IPFSCronService],
})
export class IPFSContentModule {}