import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnrollmentEntity } from 'src/entity/enrollment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnrollmentRepository {
  constructor(
    @InjectRepository(EnrollmentEntity)
    private enrollmentRepository: Repository<EnrollmentEntity>,
  ) {}

  /**
   * @returns {Promise<EnrollmentEntity[]>}
   */
  async findAll(): Promise<EnrollmentEntity[]> {
    return await this.enrollmentRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<EnrollmentEntity>}
   */
  async findOne(id: number): Promise<EnrollmentEntity> {
    return await this.enrollmentRepository.findOne({
      where: { enrollment_id: id },
    });
  }

  /**
   * @param enrollmentData
   * @returns {Promise<EnrollmentEntity>}
   */
  async create(enrollmentData: EnrollmentEntity): Promise<EnrollmentEntity> {
    return await this.enrollmentRepository.save(enrollmentData);
  }

  /**
   * @param id
   * @param enrollmentData
   * @returns {Promise<EnrollmentEntity>}
   */
  async update(
    id: number,
    enrollmentData: EnrollmentEntity,
  ): Promise<EnrollmentEntity> {
    await this.enrollmentRepository.update(
      { enrollment_id: id },
      enrollmentData,
    );
    return await this.enrollmentRepository.findOne({
      where: { enrollment_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { enrollment_id: id },
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
