import { Field, ObjectType } from '@nestjs/graphql';
import { IFindOwnersResponse } from '../interfaces';
import { OwnerDto } from './owner.dto';

@ObjectType('FindOwnersResponse')
export class FindOwnersResponseDto implements IFindOwnersResponse {
  @Field(() => Number)
  readonly offset: number;

  @Field(() => Number)
  readonly limit: number;

  @Field(() => Number)
  readonly totalCount: number;

  @Field(() => OwnerDto)
  readonly node: OwnerDto[]
}
