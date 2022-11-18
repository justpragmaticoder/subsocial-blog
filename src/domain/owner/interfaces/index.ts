export interface IBaseOwner {
  readonly ownerId: string;
  readonly nickname?: string;
}

export interface IOwner extends IBaseOwner {
  readonly id: number;
  readonly createdAtTime: Date;
  readonly updatedAtTime: Date;
}

export interface ICreateOwnerInput extends IBaseOwner {
  readonly ownerId: string;
  readonly nickname?: string;
}

export interface IFindOwnersResponse {
  readonly offset: number;
  readonly limit: number;
  readonly totalCount: number;
  readonly node: IOwner[];
}