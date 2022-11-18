import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { OwnerResolver } from "./owner.resolver";
import { OwnerDto } from './dto/owner.dto';
import { OwnerEntity } from './entities/owner.entity';
import { OwnerService } from './owner.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([OwnerEntity])],
      services: [OwnerService],
      resolvers: [
        {
          DTOClass: OwnerDto,
          ServiceClass: OwnerService,
        }
      ]
    })
  ],
  providers: [OwnerService, OwnerResolver],
  exports: [OwnerService, OwnerResolver],
})
export class OwnerModule {}