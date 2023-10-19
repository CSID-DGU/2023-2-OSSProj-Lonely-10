import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

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
    return await this.userRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<UserEntity>}
   */
  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { user_id: id },
    });
  }

  /**
   * @param userData
   * @returns {Promise<UserEntity>}
   */
  async create(userData: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(userData);
  }

  /**
   * @param id
   * @param userData
   * @returns {Promise<UserEntity>}
   */
  async update(id: number, userData: UserEntity): Promise<UserEntity> {
    await this.userRepository.update({ user_id: id }, userData);
    return await this.userRepository.findOne({
      where: { user_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const student = await this.userRepository.findOne({
      where: { user_id: id },
    });
    await this.userRepository.remove(student);
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
