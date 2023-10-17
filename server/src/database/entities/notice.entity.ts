import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('notice')
export class Notice {
  @PrimaryGeneratedColumn('increment')
  id: number;

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
