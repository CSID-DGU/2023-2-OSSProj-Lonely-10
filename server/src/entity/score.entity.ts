import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EnrollmentEntity } from './enrollment.entity';

@Entity('score')
export class ScoreEntity {
  @PrimaryGeneratedColumn('increment')
  score_id: number;

  @Column('varchar')
  type: string;

  @Column('smallint')
  score: number;

  @ManyToOne(() => EnrollmentEntity, (enrollment) => enrollment.scores)
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: EnrollmentEntity;
}
