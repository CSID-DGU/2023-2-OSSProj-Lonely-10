import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseInfoEntity } from '#entity/courseInfo';
import { EnrolmentEntity } from '#entity/enrolment';
import { AnnouncementEntity } from '#entity/announcement';
import { AssignmentEntity } from '#entity/assignment';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'course_id' })
  course_id!: number;

  @Column({ type: 'varchar', unique: true, length: 255, name: 'course_code' })
  course_code!: string;

  @Column({ type: 'varchar', length: 255, name: 'title' })
  title!: string;

  @Column({ type: 'boolean', nullable: false, name: 'is_online' })
  is_online!: boolean;

  @OneToOne(() => CourseInfoEntity, (course_info) => course_info.course)
  course_info!: CourseInfoEntity;

  @OneToMany(() => EnrolmentEntity, (enrolment) => enrolment.course)
  enrolments!: EnrolmentEntity[];

  @OneToMany(() => AnnouncementEntity, (announcement) => announcement.course)
  announcements!: AnnouncementEntity[];

  @OneToMany(() => AssignmentEntity, (assignment) => assignment.course)
  assignments!: AssignmentEntity[];
}
