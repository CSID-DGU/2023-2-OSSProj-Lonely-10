import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('notice')
export class NoticeEntity {
  @PrimaryGeneratedColumn('increment')
  notice_id: number;

  @Column('varchar')
  type: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  url: string;

  @Column('datetime')
  date: Date;

  @Column('varchar')
  administrator: string;
}
