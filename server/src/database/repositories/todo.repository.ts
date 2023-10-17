import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  /**
   * @returns {Promise<Todo[]>}
   */
  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<Todo>}
   */
  async findOne(id: number): Promise<Todo> {
    return await this.todoRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param todoData
   * @returns {Promise<Todo>}
   */
  async create(todoData: Todo): Promise<Todo> {
    return await this.todoRepository.save(todoData);
  }

  /**
   * @param id
   * @param todoData
   * @returns {Promise<Todo>}
   */
  async update(id: number, todoData: Todo): Promise<Todo> {
    await this.todoRepository.update({ id: id }, todoData);
    return await this.todoRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({
      where: { id: id },
    });
    await this.todoRepository.remove(todo);
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
