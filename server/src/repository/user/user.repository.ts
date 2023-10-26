import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '#entity/user';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * @returns {Promise<UserEntity[]>}
   */
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<UserEntity>}
   */
  async findOne(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: { user_id: id },
    });
  }

  /**
   * @param userData
   * @returns {Promise<UserEntity>}
   */
  async create(userData: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(userData);
  }

  /**
   * @param id
   * @param userData
   * @returns {Promise<UserEntity>}
   */
  async update(id: number, userData: UserEntity): Promise<UserEntity | null> {
    await this.userRepository.update({ user_id: id }, userData);
    return this.userRepository.findOne({
      where: { user_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
    });

    if (user) {
      await this.userRepository.remove(user);
    }
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    const users = await this.userRepository.find();
    await this.userRepository.remove(users);
  }
}
