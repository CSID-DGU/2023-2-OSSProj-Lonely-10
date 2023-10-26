import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ScheduleEntity } from '#entity/schedule';

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectRepository(ScheduleEntity)
    private scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  /**
   * @returns {Promise<ScheduleEntity[]>}
   */
  async findAll(): Promise<ScheduleEntity[]> {
    return this.scheduleRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<ScheduleEntity>}
   */
  async findOne(id: number): Promise<ScheduleEntity | null> {
    return this.scheduleRepository.findOne({
      where: { schedule_id: id },
    });
  }

  /**
   * @param scheduleData
   * @returns {Promise<ScheduleEntity>}
   */
  async create(scheduleData: ScheduleEntity): Promise<ScheduleEntity> {
    return this.scheduleRepository.save(scheduleData);
  }

  /**
   * @param id
   * @param scheduleData
   * @returns {Promise<ScheduleEntity>}
   */
  async update(id: number, scheduleData: ScheduleEntity): Promise<ScheduleEntity | null> {
    await this.scheduleRepository.update({ schedule_id: id }, scheduleData);
    return this.scheduleRepository.findOne({
      where: { schedule_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const schedule = await this.scheduleRepository.findOne({
      where: { schedule_id: id },
    });

    if (schedule) {
      await this.scheduleRepository.remove(schedule);
    }
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.scheduleRepository.clear();
  }
}
