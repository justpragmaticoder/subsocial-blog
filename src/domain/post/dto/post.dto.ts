import { ObjectType, Field } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { IPost } from '../interfaces';
import { GraphQLString } from 'graphql';

@ObjectType('Post')
export class PostDto implements IPost {
  @FilterableField()
  readonly id: number;

  @FilterableField()
  readonly createdAtTime: Date;

  @FilterableField()
  readonly ownerId: string;

  @FilterableField()
  readonly spaceId: string;

  @FilterableField({ nullable: true })
  readonly body?: string;

  @Field(() => [GraphQLString], { nullable: true })
  readonly tags?: string[]

  @FilterableField({ nullable: true })
  readonly image?: string;

  @FilterableField({ nullable: true })
  readonly title?: string;

  @FilterableField({ nullable: true })
  readonly syncedBlock?: string;

  @FilterableField({ nullable: true })
  readonly syncedContentId?: string;
}
