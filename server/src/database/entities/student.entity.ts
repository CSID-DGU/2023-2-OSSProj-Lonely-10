import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { Authentication } from './authentication.entity';
import { Grade } from './grade.entity';
import { Todo } from './todo.entity';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'bigint', unique: true, name: 'student_code' })
  studentCode: number;

  @Column({ type: 'varchar', name: 'hashed_password' })
  hashedPasword: string;

  @Column('varchar')
  department: string;

  @Column('varchar')
  name: string;

  @Column('smallint')
  semester: number;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.students)
  enrollment: Enrollment;

  @OneToOne(() => Authentication, (authentication) => authentication.student)
  authentication: Authentication;

  @OneToMany(() => Grade, (grade) => grade.student)
  grades: Grade[];

  @OneToMany(() => Todo, (todo) => todo.student)
  todos: Todo[];
}
