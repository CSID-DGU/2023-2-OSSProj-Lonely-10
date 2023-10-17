import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from '../entities/grade.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GradeRepository {
  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
  ) {}

  /**
   * @returns {Promise<Grade[]>}
   */
  async findAll(): Promise<Grade[]> {
    return await this.gradeRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<Grade>}
   */
  async findOne(id: number): Promise<Grade> {
    return await this.gradeRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param gradeData
   * @returns {Promise<Grade>}
   */
  async create(gradeData: Grade): Promise<Grade> {
    return await this.gradeRepository.save(gradeData);
  }

  /**
   * @param id
   * @param gradeData
   * @returns {Promise<Grade>}
   */
  async update(id: number, gradeData: Grade): Promise<Grade> {
    await this.gradeRepository.update({ id: id }, gradeData);
    return await this.gradeRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const grade = await this.gradeRepository.findOne({
      where: { id: id },
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
