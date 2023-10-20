import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GradeEntity } from 'src/entity/grade.entity';
import { Repository } from 'typeorm';

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
    return await this.gradeRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<GradeEntity>}
   */
  async findOne(id: number): Promise<GradeEntity> {
    return await this.gradeRepository.findOne({
      where: { grade_id: id },
    });
  }

  /**
   * @param gradeData
   * @returns {Promise<GradeEntity>}
   */
  async create(gradeData: GradeEntity): Promise<GradeEntity> {
    return await this.gradeRepository.save(gradeData);
  }

  /**
   * @param id
   * @param gradeData
   * @returns {Promise<GradeEntity>}
   */
  async update(id: number, gradeData: GradeEntity): Promise<GradeEntity> {
    await this.gradeRepository.update({ grade_id: id }, gradeData);
    return await this.gradeRepository.findOne({
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
    await this.gradeRepository.remove(grade);
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.gradeRepository.clear();
  }
}
