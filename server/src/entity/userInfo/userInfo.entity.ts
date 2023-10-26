import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "#entity/user";

@Entity('user_info')
export class UserInfoEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'user_id' })
  user_id!: number;

  @Column({ type: 'varchar', length: 255, name: 'user_name' })
  user_name!: string;

  @Column({ type: 'varchar', unique: true, length: '255', name: 'email' })
  email!: string;

  @Column({ type: 'varchar', length: 255, name: 'department' })
  department!: string;

  @Column({ type: 'varchar', length: 255, name: 'semester' })
  semester!: string;

  @Column({ type: 'varchar', length: 255, name: 'major' })
  major!: string;

  @Column({ type: 'varchar', nullable: true, length: 255, name: 'phone_number' })
  phone_number?: string;

  @OneToOne(() => UserEntity, (user) => user.user_info)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}