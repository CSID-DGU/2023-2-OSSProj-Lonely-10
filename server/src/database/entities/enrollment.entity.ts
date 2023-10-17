import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { Attendance } from './attendance.entity';
import { Score } from './score.entity';
import { Student } from './student.entity';

@Entity('enrollment')
export class Enrollment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('boolean')
  status: boolean;

  @OneToMany(() => Course, (course) => course.enrollment)
  @JoinColumn({ name: 'course_id' })
  courses: Course[];

  @OneToMany(() => Attendance, (attendance) => attendance.enrollment)
  attendances: Attendance[];

  @OneToMany(() => Score, (score) => score.enrollment)
  scores: Score[];

  @OneToMany(() => Student, (student) => student.enrollment)
  @JoinColumn({ name: 'student_id' })
  students: Student[];
}
