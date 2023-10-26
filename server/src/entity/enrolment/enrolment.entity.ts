import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { CourseEntity } from '#entity/course';
import { AttendanceEntity } from '#entity/attendance';
import { ScoreEntity } from '#entity/score';
import { UserEntity } from '#entity/user';

@Entity('enrolment')
export class EnrolmentEntity {
  @PrimaryGeneratedColumn('increment')
  enrolment_id!: number;

  @Column('boolean')
  status!: boolean;

  @ManyToOne(() => CourseEntity, (course) => course.enrolments)
  @JoinColumn({ name: 'course_id' })
  course!: CourseEntity;

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.enrolment)
  attendances!: AttendanceEntity[];

  @OneToMany(() => ScoreEntity, (score) => score.enrolment)
  scores!: ScoreEntity[];

  @ManyToOne(() => UserEntity, (user) => user.enrolments)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}
