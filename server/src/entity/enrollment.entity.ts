import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CourseEntity } from './course.entity';
import { AttendanceEntity } from './attendance.entity';
import { ScoreEntity } from './score.entity';
import { UserEntity } from './user.entity';

@Entity('enrollment')
export class EnrollmentEntity {
  @PrimaryGeneratedColumn('increment')
  enrollment_id: number;

  @Column('boolean')
  status: boolean;

  @ManyToOne(() => CourseEntity, (course) => course.enrollments)
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.enrollment)
  attendances: AttendanceEntity[];

  @OneToMany(() => ScoreEntity, (score) => score.enrollment)
  scores: ScoreEntity[];

  @ManyToOne(() => UserEntity, (user) => user.enrollments)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
