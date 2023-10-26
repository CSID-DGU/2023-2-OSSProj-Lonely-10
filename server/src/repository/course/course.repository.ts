import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CourseEntity } from '#entity/course';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
  ) {}

  /**
   * @returns {Promise<CourseEntity[]>}
   */
  async findAll(): Promise<CourseEntity[]> {
    return this.courseRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<CourseEntity>}
   */
  async findOne(id: number): Promise<CourseEntity | null> {
    return this.courseRepository.findOne({
      where: { course_id: id },
    });
  }

  /**
   * @param courseData
   * @returns {Promise<CourseEntity>}
   */
  async create(courseData: CourseEntity): Promise<CourseEntity> {
    return this.courseRepository.save(courseData);
  }

  /**
   * @param id
   * @param courseData
   * @returns {Promise<CourseEntity>}
   */
  async update(id: number, courseData: CourseEntity): Promise<CourseEntity | null> {
    await this.courseRepository.update({ course_id: id }, courseData);
    return this.courseRepository.findOne({
      where: { course_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const course = await this.courseRepository.findOne({
      where: { course_id: id },
    });

    if (course) {
      await this.courseRepository.remove(course);
    }
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    const courses = await this.courseRepository.find();
    await this.courseRepository.remove(courses);
  }
}
