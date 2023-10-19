import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn('increment')
  todo_id: number;

  @Column('varchar')
  content: string;

  @Column({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'boolean', name: 'is_completed' })
  isCompleted: boolean;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
