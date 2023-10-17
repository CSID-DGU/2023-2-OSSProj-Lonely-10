import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from './student.entity';

@Entity('authentication')
export class Authentication {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  accessToken: string;

  @Column('varchar')
  refreshToken: string;

  @Column('smallint')
  expireDuration: number;

  @OneToOne(() => Student, (student) => student.authentication)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}
