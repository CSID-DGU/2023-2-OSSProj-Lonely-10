import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity('course_info')
export class CourseInfoEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'course_id' })
  course_id: number;

  @Column('varchar')
  days: string;

  @Column({ type: 'datetime', name: 'start_time' })
  startTime: Date;

  @Column({ type: 'datetime', name: 'end_time' })
  endTime: Date;

  @Column({ type: 'varchar', name: 'class_room' })
  classRoom: string;

  @ManyToOne(() => CourseEntity, (course) => course.courseInfos)
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;
}
