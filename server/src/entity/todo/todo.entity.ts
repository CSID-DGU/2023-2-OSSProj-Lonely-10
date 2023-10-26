import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '#entity/user';

@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'todo_id' })
  todo_id!: number;

  @Column('varchar')
  content?: string;

  @Column({ type: 'datetime', name: 'created_at' })
  created_at!: Date;

  @Column({ type: 'boolean', name: 'is_completed' })
  is_completed!: boolean;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}
