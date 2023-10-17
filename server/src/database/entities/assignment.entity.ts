import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Course } from './course.entity';

@Entity('assignment')
export class Assignment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  content: string;

  @Column('datetime')
  duration: Date;

  @ManyToOne(() => Course, (course) => course.assignments)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
