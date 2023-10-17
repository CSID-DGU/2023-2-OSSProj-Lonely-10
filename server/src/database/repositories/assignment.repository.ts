import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from '../entities/assignment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssignmentRepository {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
  ) {}

  /**
   * @returns {Promise<Assignment[]>}
   */
  async findAll(): Promise<Assignment[]> {
    return await this.assignmentRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<Assignment>}
   */
  async findOne(id: number): Promise<Assignment> {
    return await this.assignmentRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param assignmentData
   * @returns {Promise<Assignment>}
   */
  async create(assignmentData: Assignment): Promise<Assignment> {
    return await this.assignmentRepository.save(assignmentData);
  }

  /**
   * @param id
   * @param assignmentData
   * @returns {Promise<Assignment>}
   */
  async update(id: number, assignmentData: Assignment): Promise<Assignment> {
    await this.assignmentRepository.update({ id: id }, assignmentData);
    return await this.assignmentRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id: id },
    });
    await this.assignmentRepository.remove(assignment);
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.assignmentRepository.clear();
  }
}
