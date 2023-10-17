import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseInfo } from '../entities/courseInfo.entity';

@Injectable()
export class CourseInfoRepository {
  constructor(
    @InjectRepository(CourseInfo)
    private courseInfoRepository: Repository<CourseInfo>,
  ) {}

  /**
   * @returns {Promise<CourseInfo[]>}
   */
  async findAll(): Promise<CourseInfo[]> {
    return await this.courseInfoRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<CourseInfo>}
   */
  async findOne(id: number): Promise<CourseInfo> {
    return await this.courseInfoRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param courseInfoData
   * @returns {Promise<CourseInfo>}
   */
  async create(courseInfoData: CourseInfo): Promise<CourseInfo> {
    return await this.courseInfoRepository.save(courseInfoData);
  }

  /**
   * @param id
   * @param courseInfoData
   * @returns {Promise<CourseInfo>}
   */
  async update(id: number, courseInfoData: CourseInfo): Promise<CourseInfo> {
    await this.courseInfoRepository.update({ id: id }, courseInfoData);
    return await this.courseInfoRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const courseInfo = await this.courseInfoRepository.findOne({
      where: { id: id },
    });
    await this.courseInfoRepository.remove(courseInfo);
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.courseInfoRepository.clear();
  }
}
