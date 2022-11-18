import { ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { IIPFSContent } from '../interfaces';

@ObjectType('IPFSContent')
export class IPFSContentDto implements IIPFSContent {
  @FilterableField()
  readonly id: number;

  @FilterableField()
  readonly createdAtTime: Date;

  @FilterableField()
  readonly updatedAtTime: Date;

  @FilterableField()
  readonly block: string;

  @FilterableField()
  readonly folderCid: string;
}
