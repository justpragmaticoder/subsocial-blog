import { Field, InputType } from '@nestjs/graphql';
import { ICreatePostInput } from '../interfaces';
import { GraphQLString } from 'graphql';

@InputType()
export class CreatePostContentInput {
  @Field({ nullable: true })
  readonly body?: string;

  @Field(() => [GraphQLString], { nullable: true })
  readonly tags?: string[]

  @Field({ nullable: true })
  readonly image?: string;

  @Field({ nullable: true })
  readonly title?: string;
}

@InputType()
export class CreatePostInput implements ICreatePostInput {
  @Field()
  readonly ownerId: string;

  @Field()
  readonly spaceId: string;

  @Field(() => CreatePostContentInput)
  readonly content: CreatePostContentInput;
}
