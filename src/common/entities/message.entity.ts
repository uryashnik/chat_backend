import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { MessageTagEntity } from './message-tag.entity';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 240 })
  text: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', nullable: false })
  author: UserEntity;

  @ManyToOne(() => MessageTagEntity, { onDelete: 'SET NULL', nullable: true })
  tag: MessageTagEntity;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at' })
  deletedAt?: Date;
}
