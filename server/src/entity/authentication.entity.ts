import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('authentication')
export class AuthenticationEntity {
  @PrimaryGeneratedColumn('increment')
  authentication_id: number;

  @Column({ type: 'varchar', name: 'access_token' })
  accessToken: string;

  @Column({ type: 'varchar', name: 'refresh_token' })
  refreshToken: string;

  @Column({ type: 'smallint', name: 'expire_duration' })
  expireDuration: number;

  @OneToOne(() => UserEntity, (user) => user.authentication)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
