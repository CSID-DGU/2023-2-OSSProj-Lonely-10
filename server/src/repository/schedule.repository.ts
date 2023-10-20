import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from 'src/entity/schedule.entity';
import { Repository } from 'typeorm';

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
    return await this.scheduleRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<ScheduleEntity>}
   */
  async findOne(id: number): Promise<ScheduleEntity> {
    return await this.scheduleRepository.findOne({
      where: { schedule_id: id },
    });
  }

  /**
   * @param scheduleData
   * @returns {Promise<ScheduleEntity>}
   */
  async create(scheduleData: ScheduleEntity): Promise<ScheduleEntity> {
    return await this.scheduleRepository.save(scheduleData);
  }

  /**
   * @param id
   * @param scheduleData
   * @returns {Promise<ScheduleEntity>}
   */
  async update(
    id: number,
    scheduleData: ScheduleEntity,
  ): Promise<ScheduleEntity> {
    await this.scheduleRepository.update({ schedule_id: id }, scheduleData);
    return await this.scheduleRepository.findOne({
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
    await this.scheduleRepository.remove(schedule);
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.scheduleRepository.clear();
  }
}
