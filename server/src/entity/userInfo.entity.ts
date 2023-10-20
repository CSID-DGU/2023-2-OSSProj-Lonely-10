import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_info')
export class UserInfoEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  department: string;

  @Column({ type: 'smallint' })
  semester: number;

  @Column({ type: 'varchar' })
  major: string;

  @Column({ type: 'varchar', name: 'phone_number' })
  phoneNumber: string;

  @OneToOne(() => UserEntity, (user) => user.userInfo)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
