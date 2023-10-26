import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EnrolmentEntity } from '#entity/enrolment';

@Injectable()
export class EnrolmentRepository {
  constructor(
    @InjectRepository(EnrolmentEntity)
    private enrolmentRepository: Repository<EnrolmentEntity>,
  ) {}

  /**
   * @returns {Promise<EnrolmentEntity[]>}
   */
  async findAll(): Promise<EnrolmentEntity[]> {
    return this.enrolmentRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<EnrolmentEntity>}
   */
  async findOne(id: number): Promise<EnrolmentEntity | null> {
    return this.enrolmentRepository.findOne({
      where: { enrolment_id: id },
    });
  }

  /**
   * @param enrolmentData
   * @returns {Promise<EnrolmentEntity>}
   */
  async create(enrolmentData: EnrolmentEntity): Promise<EnrolmentEntity> {
    return this.enrolmentRepository.save(enrolmentData);
  }

  /**
   * @param id
   * @param enrolmentData
   * @returns {Promise<EnrolmentEntity>}
   */
  async update(id: number, enrolmentData: EnrolmentEntity): Promise<EnrolmentEntity | null> {
    await this.enrolmentRepository.update({ enrolment_id: id }, enrolmentData);
    return this.enrolmentRepository.findOne({
      where: { enrolment_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const enrolment = await this.enrolmentRepository.findOne({
      where: { enrolment_id: id },
    });

    if (enrolment) {
      await this.enrolmentRepository.remove(enrolment);
    }
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.enrolmentRepository.clear();
  }
}
