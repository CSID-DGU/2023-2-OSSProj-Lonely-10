import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CourseInfo } from './courseInfo.entity';
import { Assignment } from './assignment.entity';
import { Announcement } from './announcement.entity';
import { Enrollment } from './enrollment.entity';

@Entity('course')
export class Course {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true, name: 'course_code' })
  courseCode: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  professor: string;

  @Column({ type: 'varchar', name: 'class_room' })
  classRoom: string;

  @Column({ type: 'boolean', name: 'is_online' })
  isOnline: boolean;

  @OneToMany(() => CourseInfo, (courseInfo) => courseInfo.course)
  courseInfos: CourseInfo[];

  @OneToMany(() => Assignment, (assignment) => assignment.course)
  assignments: Assignment[];

  @OneToMany(() => Announcement, (announcement) => announcement.course)
  announcements: Announcement[];

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.courses)
  enrollment: Enrollment;
}
