import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { EnrolmentEntity } from '#entity/enrolment';

@Entity('score')
export class ScoreEntity {
	@PrimaryGeneratedColumn('increment')
	score_id!: number;

	@Column('varchar')
	type!: string;

	@Column('smallint')
	score!: number;

	@ManyToOne(() => EnrolmentEntity, (enrolment) => enrolment.scores)
	@JoinColumn({ name: 'enrolment_id' })
	enrolment!: EnrolmentEntity;
}