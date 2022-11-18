import { ArgsType } from '@nestjs/graphql';
import { PagingStrategies, QueryArgsType } from '@nestjs-query/query-graphql';
import { PostDto } from '../dto/post.dto';

@ArgsType()
export class FindPostsInput extends QueryArgsType(PostDto, { pagingStrategy: PagingStrategies.OFFSET }) {}
