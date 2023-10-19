import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('grade')
export class GradeEntity {
  @PrimaryGeneratedColumn('increment')
  grade_id: number;

  @Column('smallint')
  semester: number;

  @Column({ type: 'varchar', name: 'course_name' })
  courseName: string;

  @Column('varchar')
  score: string;

  @ManyToOne(() => UserEntity, (user) => user.grades)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
