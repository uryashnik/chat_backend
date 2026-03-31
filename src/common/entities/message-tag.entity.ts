import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('message_tag')
export class MessageTagEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 40 })
  label: string;
}
