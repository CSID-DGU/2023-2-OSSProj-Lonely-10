import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from '../entities/score.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScoreRepository {
  constructor(
    @InjectRepository(Score) private scoreRepository: Repository<Score>,
  ) {}

  /**
   * @returns {Promise<Score[]>}
   */
  async findAll(): Promise<Score[]> {
    return await this.scoreRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<Score>}
   */
  async findOne(id: number): Promise<Score> {
    return await this.scoreRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param scoreData
   * @returns {Promise<Score>}
   */
  async create(scoreData: Score): Promise<Score> {
    return await this.scoreRepository.save(scoreData);
  }

  /**
   * @param id
   * @param scoreData
   * @returns {Promise<Score>}
   */
  async update(id: number, scoreData: Score): Promise<Score> {
    await this.scoreRepository.update({ id: id }, scoreData);
    return await this.scoreRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const score = await this.scoreRepository.findOne({
      where: { id: id },
    });
    await this.scoreRepository.remove(score);
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.scoreRepository.clear();
  }
}
