import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { CourseEntity } from '#entity/course';

@Entity('announcement')
export class AnnouncementEntity {
	@PrimaryGeneratedColumn('increment')
	announcement_id!: number;

	@Column('varchar')
	title!: string;

	@Column('varchar')
	content!: string;

	@Column('varchar')
	writer!: string;

	@Column({ type: 'datetime', name: 'created_at' })
	created_at!: Date;

	@ManyToOne(() => CourseEntity, (course) => course.announcements)
	@JoinColumn({ name: 'course_id' })
	course!: CourseEntity;
}