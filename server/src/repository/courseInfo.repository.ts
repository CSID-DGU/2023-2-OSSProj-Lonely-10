import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseInfoEntity } from 'src/entity/courseInfo.entity';

@Injectable()
export class CourseInfoRepository {
  constructor(
    @InjectRepository(CourseInfoEntity)
    private courseInfoRepository: Repository<CourseInfoEntity>,
  ) {}

  /**
   * @returns {Promise<CourseInfoEntity[]>}
   */
  async findAll(): Promise<CourseInfoEntity[]> {
    return await this.courseInfoRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<CourseInfoEntity>}
   */
  async findOne(id: number): Promise<CourseInfoEntity> {
    return await this.courseInfoRepository.findOne({
      where: { course_id: id },
    });
  }

  /**
   * @param courseInfoData
   * @returns {Promise<CourseInfoEntity>}
   */
  async create(courseInfoData: CourseInfoEntity): Promise<CourseInfoEntity> {
    return await this.courseInfoRepository.save(courseInfoData);
  }

  /**
   * @param id
   * @param courseInfoData
   * @returns {Promise<CourseInfoEntity>}
   */
  async update(
    id: number,
    courseInfoData: CourseInfoEntity,
  ): Promise<CourseInfoEntity> {
    await this.courseInfoRepository.update({ course_id: id }, courseInfoData);
    return await this.courseInfoRepository.findOne({
      where: { course_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const courseInfo = await this.courseInfoRepository.findOne({
      where: { course_id: id },
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
