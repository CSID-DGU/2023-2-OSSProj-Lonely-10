import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from '../entities/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  /**
   * @returns {Promise<Schedule[]>}
   */
  async findAll(): Promise<Schedule[]> {
    return await this.scheduleRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<Schedule>}
   */
  async findOne(id: number): Promise<Schedule> {
    return await this.scheduleRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param scheduleData
   * @returns {Promise<Schedule>}
   */
  async create(scheduleData: Schedule): Promise<Schedule> {
    return await this.scheduleRepository.save(scheduleData);
  }

  /**
   * @param id
   * @param scheduleData
   * @returns {Promise<Schedule>}
   */
  async update(id: number, scheduleData: Schedule): Promise<Schedule> {
    await this.scheduleRepository.update({ id: id }, scheduleData);
    return await this.scheduleRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: id },
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
