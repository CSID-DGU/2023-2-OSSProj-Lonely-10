import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CourseInfoEntity } from './courseInfo.entity';
import { AssignmentEntity } from './assignment.entity';
import { AnnouncementEntity } from './announcement.entity';
import { EnrollmentEntity } from './enrollment.entity';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn('increment')
  course_id: number;

  @Column({ type: 'varchar', unique: true, name: 'course_code' })
  courseCode: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  professor: string;

  @Column({ type: 'boolean', name: 'is_online' })
  isOnline: boolean;

  @OneToMany(() => CourseInfoEntity, (courseInfo) => courseInfo.course)
  courseInfos: CourseInfoEntity[];

  @OneToMany(() => AssignmentEntity, (assignment) => assignment.course)
  assignments: AssignmentEntity[];

  @OneToMany(() => AnnouncementEntity, (announcement) => announcement.course)
  announcements: AnnouncementEntity[];

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.course)
  enrollments: EnrollmentEntity[];
}
