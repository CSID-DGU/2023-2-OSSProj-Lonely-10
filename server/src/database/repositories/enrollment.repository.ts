import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from '../entities/enrollment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnrollmentRepository {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
  ) {}

  /**
   * @returns {Promise<Enrollment[]>}
   */
  async findAll(): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<Enrollment>}
   */
  async findOne(id: number): Promise<Enrollment> {
    return await this.enrollmentRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param enrollmentData
   * @returns {Promise<Enrollment>}
   */
  async create(enrollmentData: Enrollment): Promise<Enrollment> {
    return await this.enrollmentRepository.save(enrollmentData);
  }

  /**
   * @param id
   * @param enrollmentData
   * @returns {Promise<Enrollment>}
   */
  async update(id: number, enrollmentData: Enrollment): Promise<Enrollment> {
    await this.enrollmentRepository.update({ id: id }, enrollmentData);
    return await this.enrollmentRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id: id },
    });
    await this.enrollmentRepository.remove(enrollment);
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.enrollmentRepository.clear();
  }
}
