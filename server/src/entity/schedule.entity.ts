import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('schedule')
export class ScheduleEntity {
  @PrimaryGeneratedColumn('increment')
  schedule_id: number;

  @Column('datetime')
  date: Date;

  @Column('varchar')
  title: string;

  @Column('varchar')
  description: string;
}
