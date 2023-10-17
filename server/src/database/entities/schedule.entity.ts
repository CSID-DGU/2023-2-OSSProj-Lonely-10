import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('schedule')
export class Schedule {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('datetime')
  date: Date;

  @Column('varchar')
  title: string;

  @Column('varchar')
  description: string;
}
