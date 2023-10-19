import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity('assignment')
export class AssignmentEntity {
  @PrimaryGeneratedColumn('increment')
  assignment_id: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  content: string;

  @Column('datetime')
  duration: Date;

  @Column({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => CourseEntity, (course) => course.assignments)
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;
}
