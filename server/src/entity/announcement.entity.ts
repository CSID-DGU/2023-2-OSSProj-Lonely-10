import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity('announcement')
export class AnnouncementEntity {
  @PrimaryGeneratedColumn('increment')
  announcement_id: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  content: string;

  @Column('varchar')
  writer: string;

  @Column({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => CourseEntity, (course) => course.announcements)
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;
}
