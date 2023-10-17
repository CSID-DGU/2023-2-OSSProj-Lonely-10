import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Enrollment } from './enrollment.entity';

@Entity('score')
export class Score {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  type: string;

  @Column('smallint')
  score: number;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.scores)
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: Enrollment;
}
