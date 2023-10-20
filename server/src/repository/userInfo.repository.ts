import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInfoEntity } from 'src/entity/userInfo.entity';

@Injectable()
export class CourseInfoRepository {
  constructor(
    @InjectRepository(UserInfoEntity)
    private courseInfoRepository: Repository<UserInfoEntity>,
  ) {}

  /**
   * @returns {Promise<UserInfoEntity[]>}
   */
  async findAll(): Promise<UserInfoEntity[]> {
    return await this.courseInfoRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<UserInfoEntity>}
   */
  async findOne(id: number): Promise<UserInfoEntity> {
    return await this.courseInfoRepository.findOne({
      where: { user_id: id },
    });
  }

  /**
   * @param courseInfoData
   * @returns {Promise<UserInfoEntity>}
   */
  async create(courseInfoData: UserInfoEntity): Promise<UserInfoEntity> {
    return await this.courseInfoRepository.save(courseInfoData);
  }

  /**
   * @param id
   * @param courseInfoData
   * @returns {Promise<UserInfoEntity>}
   */
  async update(
    id: number,
    courseInfoData: UserInfoEntity,
  ): Promise<UserInfoEntity> {
    await this.courseInfoRepository.update({ user_id: id }, courseInfoData);
    return await this.courseInfoRepository.findOne({
      where: { user_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const courseInfo = await this.courseInfoRepository.findOne({
      where: { user_id: id },
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
