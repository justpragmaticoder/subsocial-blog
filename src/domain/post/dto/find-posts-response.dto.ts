import { Field, ObjectType } from '@nestjs/graphql';
import { PostDto } from './post.dto';
import { IFindPostsResponse } from '../interfaces';

@ObjectType('FindPostsResponse')
export class FindPostsResponseDto implements IFindPostsResponse {
  @Field(() => Number)
  readonly offset: number;

  @Field(() => Number)
  readonly limit: number;

  @Field(() => Number)
  readonly totalCount: number;

  @Field(() => PostDto)
  readonly node: PostDto[]
}
