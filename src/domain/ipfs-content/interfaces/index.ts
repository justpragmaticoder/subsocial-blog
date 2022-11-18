export interface IIPFSContent {
  readonly id: number;
  readonly block: string;
  readonly folderCid: string;
  readonly createdAtTime: Date;
  readonly updatedAtTime: Date;
}

export interface IIPFSContentForSync {
  readonly body: string;
  readonly tags: string[]
  readonly image: string;
  readonly title: string;
}

export interface ICreateIPFSContentInput {
  readonly block: string;
  readonly folderCid: string;
}
