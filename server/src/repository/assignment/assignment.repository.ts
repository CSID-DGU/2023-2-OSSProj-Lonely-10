import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AssignmentEntity } from '#entity/assignment';

@Injectable()
export class AssignmentRepository {
  constructor(
    @InjectRepository(AssignmentEntity)
    private assignmentRepository: Repository<AssignmentEntity>,
  ) {}

  /**
   * @returns {Promise<AssignmentEntity[]>}
   */
  async findAll(): Promise<AssignmentEntity[]> {
    return this.assignmentRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<AssignmentEntity>}
   */
  async findOne(id: number): Promise<AssignmentEntity | null> {
    return this.assignmentRepository.findOne({
      where: { assignment_id: id },
    });
  }

  /**
   * @param assignmentData
   * @returns {Promise<AssignmentEntity>}
   */
  async create(assignmentData: AssignmentEntity): Promise<AssignmentEntity> {
    return this.assignmentRepository.save(assignmentData);
  }

  /**
   * @param id
   * @param assignmentData
   * @returns {Promise<AssignmentEntity>}
   */
  async update(id: number, assignmentData: AssignmentEntity): Promise<AssignmentEntity | null> {
    await this.assignmentRepository.update({ assignment_id: id }, assignmentData);
    return this.assignmentRepository.findOne({
      where: { assignment_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const assignment = await this.assignmentRepository.findOne({
      where: { assignment_id: id },
    });

    if (assignment) {
      await this.assignmentRepository.remove(assignment);
    }
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.assignmentRepository.clear();
  }
}
