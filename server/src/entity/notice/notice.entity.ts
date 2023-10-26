import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notice')
export class NoticeEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'notice_id' })
  notice_id!: number;

  @Column({ type: 'varchar', name: 'type' })
  type!: string;

  @Column({ type: 'varchar', name: 'title' })
  title!: string;

  @Column({ type: 'varchar', name: 'url' })
  url!: string;

  @Column({ type: 'datetime', name: 'date' })
  date!: Date;

  @Column({ type: 'varchar', name: 'administrator' })
  administrator!: string;
}
