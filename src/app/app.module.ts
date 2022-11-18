import { Module } from '@nestjs/common';
import { AppConfigurationModule } from '../../libs/config/src/app';
import { DatabaseModule } from '../../libs/database/src/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as depthLimit from 'graphql-depth-limit';
import { PostModule } from '../domain/post/post.module';
import { OwnerModule } from '../domain/owner/owner.module';
import { IPFSContentModule } from '../domain/ipfs-content/ipfs-content.module';
import { ScheduleModule } from '@nestjs/schedule';
import { IPFSConfigModule } from '../../libs/config/src/ipfs';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AppConfigurationModule,
    DatabaseModule,
    IPFSConfigModule,
    OwnerModule,
    PostModule,
    IPFSContentModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/playground',
      autoSchemaFile: process.cwd() + '/schema.gql',
      playground: true,
      validationRules: [
        depthLimit(5),
      ],
    }),
  ],
})
export class AppModule {}
