import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TodoEntity } from '#entity/todo';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  /**
   * @returns {Promise<TodoEntity[]>}
   */
  async findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<TodoEntity>}
   */
  async findOne(id: number): Promise<TodoEntity | null> {
    return this.todoRepository.findOne({
      where: { todo_id: id },
    });
  }

  /**
   * @param todoData
   * @returns {Promise<TodoEntity>}
   */
  async create(todoData: TodoEntity): Promise<TodoEntity> {
    return this.todoRepository.save(todoData);
  }

  /**
   * @param id
   * @param todoData
   * @returns {Promise<Todo>}
   */
  async update(id: number, todoData: TodoEntity): Promise<TodoEntity | null> {
    await this.todoRepository.update({ todo_id: id }, todoData);
    return this.todoRepository.findOne({
      where: { todo_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({
      where: { todo_id: id },
    });

    if (todo) {
      await this.todoRepository.remove(todo);
    }
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    const todos = await this.todoRepository.find();
    await this.todoRepository.remove(todos);
  }
}
