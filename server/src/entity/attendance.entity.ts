import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EnrollmentEntity } from './enrollment.entity';

@Entity('attendance')
export class AttendanceEntity {
  @PrimaryGeneratedColumn('increment')
  attendance_id: number;

  @Column('datetime')
  date: Date;

  @Column('varchar')
  status: string;

  @ManyToOne(() => EnrollmentEntity, (enrollment) => enrollment.attendances)
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: EnrollmentEntity;
}
