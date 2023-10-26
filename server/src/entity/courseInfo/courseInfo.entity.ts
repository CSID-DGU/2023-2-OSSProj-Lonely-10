import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { CourseEntity } from '#entity/course';

@Entity('course_info')
export class CourseInfoEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'course_id' })
  course_id!: number;

  @Column('varchar')
  days?: string;

  @Column({ type: 'datetime', name: 'start_time' })
  start_time?: Date;

  @Column({ type: 'datetime', name: 'end_time' })
  end_time?: Date;

  @Column({ type: 'varchar', name: 'class_room' })
  class_room?: string;

  @OneToOne(() => CourseEntity, (course) => course.course_info)
  @JoinColumn({ name: 'course_id' })
  course!: CourseEntity;
}
