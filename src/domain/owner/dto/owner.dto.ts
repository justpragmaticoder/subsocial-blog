import { ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { IOwner } from '../interfaces';

@ObjectType('Owner')
export class OwnerDto implements IOwner {
  @FilterableField()
  readonly id: number;

  @FilterableField()
  readonly createdAtTime: Date;

  @FilterableField()
  readonly updatedAtTime: Date;

  @FilterableField()
  readonly ownerId: string;

  @FilterableField({ nullable: true })
  readonly nickname?: string;
}
