import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from './student.entity';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  content: string;

  @Column('datetime')
  date: Date;

  @Column({ type: 'boolean', name: 'is_completed' })
  isCompleted: boolean;

  @ManyToOne(() => Student, (student) => student.todos)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}
