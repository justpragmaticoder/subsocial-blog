import {Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import { EntitiesEnum } from '../../../../libs/common-enums';
import { IPost } from '../interfaces';
import { OwnerEntity } from '../../owner/entities/owner.entity';
import { IOwner } from '../../owner/interfaces';
import { IPFSContentEntity } from '../../ipfs-content/entity/ipfs-content.entity';
import { IIPFSContent } from '../../ipfs-content/interfaces';

@Entity(EntitiesEnum.POST)
@Index(`IDX_${EntitiesEnum.POST}_syncedBlock`, ['syncedBlock'])
export class PostEntity implements IPost {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
  createdAtTime: Date;

  @Column({ name: 'ownerId', type: 'varchar', length: 48 })
  ownerId: string;

  @Column({ type: 'varchar', length: 255 })
  spaceId: string;

  @Column({ type: 'text', nullable: true })
  body: string;

  @Column({ type: 'json', nullable: true })
  tags: string[]

  @Column({ type: 'mediumtext', nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  syncedBlock: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  syncedContentId: string;

  @ManyToOne(() => OwnerEntity, (owner) => owner.posts)
  @JoinColumn({
    name: 'ownerId',
    referencedColumnName: 'ownerId'
  })
  owner?: IOwner;

  /**
   * We can't use a relation for now because during testing I saw cases with duplicated block+folderCid values for different posts.
   */
  // @ManyToOne(() => IPFSContentEntity, (ipfsContent) => ipfsContent.post)
  // @JoinColumn({
  //   name: 'syncedBlock',
  //   referencedColumnName: 'block'
  // })
  // ipfsContent?: IIPFSContent;
}
