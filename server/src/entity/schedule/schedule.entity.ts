import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schedule')
export class ScheduleEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'schedule_id' })
  schedule_id!: number;

  @Column({ type: 'datetime', name: 'date' })
  date!: Date;

  @Column({ type: 'varchar', name: 'title' })
  title!: string;

  @Column({ type: 'varchar', name: 'description' })
  description?: string;
}
