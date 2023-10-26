import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '#entity/user';

@Entity('grade')
export class GradeEntity {
  @PrimaryGeneratedColumn('increment')
  grade_id!: number;

  @Column('smallint')
  semester!: number;

  @Column({ type: 'varchar', name: 'course_name' })
  course_name!: string;

  @Column('varchar')
  score!: string;

  @ManyToOne(() => UserEntity, (user) => user.grades)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}
