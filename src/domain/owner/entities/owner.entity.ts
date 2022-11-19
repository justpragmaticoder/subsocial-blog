import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { EntitiesEnum } from '../../../../libs/common-enums';
import { IOwner } from '../interfaces';
import { PostEntity } from '../../post/entities/post.entity';
import { IPost } from '../../post/interfaces';

/**
 * I don't know from where ownerId should be passed to our system, or should be created by us.
 * That's why I'm implementing a possibility to create an owner of content in our system.
 */
@Entity(EntitiesEnum.OWNER)
@Unique(`UC_${EntitiesEnum.OWNER}_ownerId`, ['ownerId'])
export class OwnerEntity implements IOwner {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
  createdAtTime: Date;

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAtTime: Date;

  @Column({ name: 'ownerId', type: 'varchar', length: 48 })
  ownerId: string;

  @Column({ name: 'nickname', type: 'varchar', length: 50, nullable: true })
  nickname: string;

  @OneToMany(() => PostEntity, (post) => post.owner, {
    persistence: false,
    cascade: false,
  })
  posts?: IPost[];
}
