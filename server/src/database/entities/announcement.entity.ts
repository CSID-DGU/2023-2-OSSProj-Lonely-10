import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Course } from './course.entity';

@Entity('announcement')
export class Announcement {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  content: string;

  @Column('varchar')
  writer: string;

  @ManyToOne(() => Course, (course) => course.announcements)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
