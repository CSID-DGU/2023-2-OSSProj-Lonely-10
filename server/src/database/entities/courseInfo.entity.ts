import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Course } from './course.entity';

@Entity('course_info')
export class CourseInfo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  days: string;

  @Column({ type: 'datetime', name: 'start_time' })
  startTime: Date;

  @Column({ type: 'datetime', name: 'end_time' })
  endTime: Date;

  @ManyToOne(() => Course, (course) => course.courseInfos)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
