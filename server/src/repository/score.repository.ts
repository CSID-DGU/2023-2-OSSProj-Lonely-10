import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScoreEntity } from 'src/entity/score.entity';
import { Repository } from 'typeorm';

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
    return await this.scoreRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<ScoreEntity>}
   */
  async findOne(id: number): Promise<ScoreEntity> {
    return await this.scoreRepository.findOne({
      where: { score_id: id },
    });
  }

  /**
   * @param scoreData
   * @returns {Promise<ScoreEntity>}
   */
  async create(scoreData: ScoreEntity): Promise<ScoreEntity> {
    return await this.scoreRepository.save(scoreData);
  }

  /**
   * @param id
   * @param scoreData
   * @returns {Promise<ScoreEntity>}
   */
  async update(id: number, scoreData: ScoreEntity): Promise<ScoreEntity> {
    await this.scoreRepository.update({ score_id: id }, scoreData);
    return await this.scoreRepository.findOne({
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
