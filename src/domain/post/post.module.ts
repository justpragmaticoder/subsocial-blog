import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { PostService } from './post-service';
import { PostEntity } from './entities/post.entity';
import { PostDto } from './dto/post.dto';
import { PostResolver } from './post-resolver';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([PostEntity])],
      services: [PostService],
      resolvers: [
        {
          DTOClass: PostDto,
          ServiceClass: PostService,
        }
      ]
    })
  ],
  providers: [PostService, PostResolver],
  exports: [PostService, PostResolver],
})
export class PostModule {}