import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserInfoEntity } from '#entity/userInfo';
import { TodoEntity } from '#entity/todo';
import { GradeEntity } from '#entity/grade';
import { EnrolmentEntity } from '#entity/enrolment';
import { AuthenticationEntity } from '#entity/authentication';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'user_id' })
  user_id!: number;

  @Column({ type: 'bigint', unsigned: true, unique: true, name: 'user_code' })
  user_code!: number;

  @Column({ type: 'varchar', nullable: true, name: 'hashed_password' })
  hashed_password!: string;

  @OneToOne(() => UserInfoEntity, (user_info) => user_info.user)
  @JoinColumn({ name: 'user_id' })
  user_info!: UserInfoEntity;

  @OneToOne(() => AuthenticationEntity, (authentication) => authentication.user)
  authentication!: AuthenticationEntity;

  @OneToMany(() => GradeEntity, (grade) => grade.user)
  grades!: GradeEntity[];

  @OneToMany(() => EnrolmentEntity, (enrolment) => enrolment.user)
  enrolments!: EnrolmentEntity[];

  @ManyToOne(() => TodoEntity, (todo) => todo.user)
  todos!: TodoEntity[];
}
