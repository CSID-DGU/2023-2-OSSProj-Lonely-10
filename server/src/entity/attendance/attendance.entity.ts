import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { EnrolmentEntity } from '#entity/enrolment';

@Entity('attendance')
export class AttendanceEntity {
	@PrimaryGeneratedColumn('increment')
	attendance_id!: number;

	@Column('datetime')
	date!: Date;

	@Column('varchar')
	status!: string;

	@ManyToOne(() => EnrolmentEntity, (enrolment) => enrolment.attendances)
	@JoinColumn({ name: 'enrolment_id' })
	enrolment!: EnrolmentEntity;
}