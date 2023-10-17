import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Enrollment } from './enrollment.entity';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('datetime')
  date: Date;

  @Column('varchar')
  status: string;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.attendances)
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: Enrollment;
}
