import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ScoreEntity } from '#entity/score';

@Injectable()
export class ScoreRepository {
  constructor(
    @InjectRepository(ScoreEntity)
    private scoreRepository: Repository<ScoreEntity>,
  ) {}

  /**
   * @returns {Promise<ScoreEntity[]>}
   */
  async findAll(): Promise<ScoreEntity[]> {
    return this.scoreRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<ScoreEntity>}
   */
  async findOne(id: number): Promise<ScoreEntity | null> {
    return this.scoreRepository.findOne({
      where: { score_id: id },
    });
  }

  /**
   * @param scoreData
   * @returns {Promise<ScoreEntity>}
   */
  async create(scoreData: ScoreEntity): Promise<ScoreEntity> {
    return this.scoreRepository.save(scoreData);
  }

  /**
   * @param id
   * @param scoreData
   * @returns {Promise<ScoreEntity>}
   */
  async update(id: number, scoreData: ScoreEntity): Promise<ScoreEntity | null> {
    await this.scoreRepository.update({ score_id: id }, scoreData);
    return this.scoreRepository.findOne({
      where: { score_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const score = await this.scoreRepository.findOne({
      where: { score_id: id },
    });

    if (score) {
      await this.scoreRepository.remove(score);
    }
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.scoreRepository.clear();
  }
}
