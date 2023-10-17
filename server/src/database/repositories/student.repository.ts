import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentRepository {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  /**
   * @returns {Promise<Student[]>}
   */
  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<Student>}
   */
  async findOne(id: number): Promise<Student> {
    return await this.studentRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param studentData
   * @returns {Promise<Student>}
   */
  async create(studentData: Student): Promise<Student> {
    return await this.studentRepository.save(studentData);
  }

  /**
   * @param id
   * @param studentData
   * @returns {Promise<Student>}
   */
  async update(id: number, studentData: Student): Promise<Student> {
    await this.studentRepository.update({ id: id }, studentData);
    return await this.studentRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const student = await this.studentRepository.findOne({
      where: { id: id },
    });
    await this.studentRepository.remove(student);
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    const students = await this.studentRepository.find();
    await this.studentRepository.remove(students);
  }
}
