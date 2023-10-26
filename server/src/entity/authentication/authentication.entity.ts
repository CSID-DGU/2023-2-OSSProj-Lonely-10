import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import { UserEntity } from '#entity/user';

@Entity('authentication')
export class AuthenticationEntity {
	@PrimaryGeneratedColumn('increment')
	authentication_id!: number;

	@Column({ type: 'varchar', name: 'access_token' })
	access_token!: string;

	@Column({ type: 'varchar', name: 'refresh_token' })
	refresh_token!: string;

	@Column({ type: 'smallint', name: 'expire_duration' })
	expire_duration!: number;

	@OneToOne(() => UserEntity, (user) => user.authentication)
	@JoinColumn({ name: 'user_id' })
	user!: UserEntity;
}