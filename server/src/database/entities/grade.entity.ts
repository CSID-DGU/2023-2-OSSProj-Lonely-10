import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from './student.entity';

@Entity('grade')
export class Grade {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('smallint')
  semester: number;

  @Column('varchar')
  courseName: string;

  @Column('varchar')
  score: string;

  @ManyToOne(() => Student, (student) => student.grades)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}
