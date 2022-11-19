import {Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { EntitiesEnum } from '../../../../libs/common-enums';
import { IIPFSContent } from '../interfaces';

@Entity(EntitiesEnum.IPFC_CONTENT)
@Index(`IDX_${EntitiesEnum.IPFC_CONTENT}_block_folderCid`, ['block', 'folderCid'])
export class IPFSContentEntity implements IIPFSContent {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  block: string;

  @Column({ type: 'varchar', length: 255 })
  folderCid: string;

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
  createdAtTime: Date;

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAtTime: Date;

  /**
   * We can't use a relation for now because during testing I saw cases with duplicated block+folderCid values for different posts.
   */
  // @OneToMany(() => PostEntity, (post) => post.ipfsContent)
  // @JoinColumn({
  //   name: 'block',
  //   referencedColumnName: 'syncedBlock'
  // })
  // post?: IPost;
}
