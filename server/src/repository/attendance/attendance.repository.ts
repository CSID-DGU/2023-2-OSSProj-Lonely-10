import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AttendanceEntity } from '#entity/attendance';

@Injectable()
export class AttendanceRepository {
  constructor(
    @InjectRepository(AttendanceEntity)
    private attendanceRepository: Repository<AttendanceEntity>,
  ) {}

  /**
   * @returns {Promise<AttendanceEntity[]>}
   */
  async findAll(): Promise<AttendanceEntity[]> {
    return this.attendanceRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<AttendanceEntity>}
   */
  async findOne(id: number): Promise<AttendanceEntity | null> {
    return this.attendanceRepository.findOne({
      where: { attendance_id: id },
    });
  }

  /**
   * @param attendanceData
   * @returns {Promise<AttendanceEntity>}
   */
  async create(attendanceData: AttendanceEntity): Promise<AttendanceEntity> {
    return this.attendanceRepository.save(attendanceData);
  }

  /**
   * @param id
   * @param attendanceData
   * @returns {Promise<AttendanceEntity>}
   */
  async update(id: number, attendanceData: AttendanceEntity): Promise<AttendanceEntity | null> {
    await this.attendanceRepository.update({ attendance_id: id }, attendanceData);
    return this.attendanceRepository.findOne({
      where: { attendance_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const attendance = await this.attendanceRepository.findOne({
      where: { attendance_id: id },
    });

    if (attendance) {
      await this.attendanceRepository.remove(attendance);
    }
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.attendanceRepository.clear();
  }
}
