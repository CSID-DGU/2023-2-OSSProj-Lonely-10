import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GradeEntity } from '#entity/grade';

@Injectable()
export class GradeRepository {
  constructor(
    @InjectRepository(GradeEntity)
    private gradeRepository: Repository<GradeEntity>,
  ) {}

  /**
   * @returns {Promise<GradeEntity[]>}
   */
  async findAll(): Promise<GradeEntity[]> {
    return this.gradeRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<GradeEntity>}
   */
  async findOne(id: number): Promise<GradeEntity | null> {
    return this.gradeRepository.findOne({
      where: { grade_id: id },
    });
  }

  /**
   * @param gradeData
   * @returns {Promise<GradeEntity>}
   */
  async create(gradeData: GradeEntity): Promise<GradeEntity> {
    return this.gradeRepository.save(gradeData);
  }

  /**
   * @param id
   * @param gradeData
   * @returns {Promise<GradeEntity>}
   */
  async update(id: number, gradeData: GradeEntity): Promise<GradeEntity | null> {
    await this.gradeRepository.update({ grade_id: id }, gradeData);
    return this.gradeRepository.findOne({
      where: { grade_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const grade = await this.gradeRepository.findOne({
      where: { grade_id: id },
    });

    if (grade) {
      await this.gradeRepository.remove(grade);
    }
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.gradeRepository.clear();
  }
}
