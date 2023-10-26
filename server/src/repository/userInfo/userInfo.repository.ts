import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserInfoEntity } from '#entity/userInfo';

@Injectable()
export class CourseInfoRepository {
  constructor(
    @InjectRepository(UserInfoEntity)
    private userInfoRepository: Repository<UserInfoEntity>,
  ) {}

  /**
   * @returns {Promise<UserInfoEntity[]>}
   */
  async findAll(): Promise<UserInfoEntity[]> {
    return this.userInfoRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<UserInfoEntity>}
   */
  async findOne(id: number): Promise<UserInfoEntity | null> {
    return this.userInfoRepository.findOne({
      where: { user_id: id },
    });
  }

  /**
   * @param userInfoData
   * @returns {Promise<UserInfoEntity>}
   */
  async create(userInfoData: UserInfoEntity): Promise<UserInfoEntity> {
    return this.userInfoRepository.save(userInfoData);
  }

  /**
   * @param id
   * @param userInfoData
   * @returns {Promise<UserInfoEntity>}
   */
  async update(id: number, userInfoData: UserInfoEntity): Promise<UserInfoEntity | null> {
    await this.userInfoRepository.update({ user_id: id }, userInfoData);
    return this.userInfoRepository.findOne({
      where: { user_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const userInfo = await this.userInfoRepository.findOne({
      where: { user_id: id },
    });

    if (userInfo) {
      await this.userInfoRepository.remove(userInfo);
    }
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.userInfoRepository.clear();
  }
}
