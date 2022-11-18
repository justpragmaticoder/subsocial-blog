export interface IFindPostsResponse {
  readonly offset: number;
  readonly limit: number;
  readonly totalCount: number;
  readonly node: IPost[];
}

export interface IBasePost {
  readonly ownerId: string;
  readonly spaceId: string;
  readonly body?: string;
  readonly tags?: string[]
  readonly image?: string;
  readonly title?: string;
}

export interface IPost extends IBasePost {
  readonly id: number;
  readonly createdAtTime: Date;
  readonly syncedBlock?: string;
  readonly syncedContentId?: string;
}

export interface ICreatePostContentInput {
  readonly body?: string;
  readonly tags?: string[]
  readonly image?: string;
  readonly title?: string;
}

export interface ICreatePostInput {
  readonly ownerId: string;
  readonly spaceId: string;
  readonly content: ICreatePostContentInput;
}

export interface IFindPostsInternalInput {
  readonly searchConditions: {
    readonly id?: number;
    readonly createdAtTime?: Date;
    readonly syncedBlock?: string;
    readonly syncedContentId?: string;
    readonly ownerId?: string;
    readonly spaceId?: string;
    readonly body?: string;
    readonly image?: string;
    readonly title?: string;
  },
  readonly offset: number;
  readonly limit: number;
}