import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../entities/attendance.entity';

@Injectable()
export class AttendanceRepository {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  /**
   * @returns {Promise<Attendance[]>}
   */
  async findAll(): Promise<Attendance[]> {
    return await this.attendanceRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<Attendance>}
   */
  async findOne(id: number): Promise<Attendance> {
    return await this.attendanceRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param attendanceData
   * @returns {Promise<Attendance>}
   */
  async create(attendanceData: Attendance): Promise<Attendance> {
    return await this.attendanceRepository.save(attendanceData);
  }

  /**
   * @param id
   * @param attendanceData
   * @returns {Promise<Attendance>}
   */
  async update(id: number, attendanceData: Attendance): Promise<Attendance> {
    await this.attendanceRepository.update({ id: id }, attendanceData);
    return await this.attendanceRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const attendance = await this.attendanceRepository.findOne({
      where: { id: id },
    });
    await this.attendanceRepository.remove(attendance);
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.attendanceRepository.clear();
  }
}
