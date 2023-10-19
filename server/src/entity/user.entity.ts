import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { EnrollmentEntity } from './enrollment.entity';
import { AuthenticationEntity } from './authentication.entity';
import { GradeEntity } from './grade.entity';
import { UserInfoEntity } from './userInfo.entity';
import { TodoEntity } from './todo.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  user_id: number;

  @Column({ type: 'bigint', unique: true, name: 'user_code' })
  studentCode: number;

  @Column({ type: 'varchar', name: 'hashed_password' })
  hashedPasword: string;

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.user)
  enrollments: EnrollmentEntity[];

  @OneToOne(() => AuthenticationEntity, (authentication) => authentication.user)
  authentication: AuthenticationEntity;

  @OneToOne(() => UserInfoEntity, (userInfo) => userInfo.user)
  @JoinColumn({ name: 'user_id' })
  userInfo: UserInfoEntity;

  @OneToMany(() => GradeEntity, (grade) => grade.user)
  grades: GradeEntity[];

  @OneToMany(() => TodoEntity, (todo) => todo.user)
  todos: TodoEntity[];
}
