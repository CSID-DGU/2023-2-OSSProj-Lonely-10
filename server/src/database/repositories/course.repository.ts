import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  /**
   * @returns {Promise<Course[]>}
   */
  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<Course>}
   */
  async findOne(id: number): Promise<Course> {
    return await this.courseRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param courseData
   * @returns {Promise<Course>}
   */
  async create(courseData: Course): Promise<Course> {
    return await this.courseRepository.save(courseData);
  }

  /**
   * @param id
   * @param courseData
   * @returns {Promise<Course>}
   */
  async update(id: number, courseData: Course): Promise<Course> {
    await this.courseRepository.update({ id: id }, courseData);
    return await this.courseRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const course = await this.courseRepository.findOne({
      where: { id: id },
    });
    await this.courseRepository.remove(course);
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
