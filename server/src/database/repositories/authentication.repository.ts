import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authentication } from '../entities/authentication.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationRepository {
  constructor(
    @InjectRepository(Authentication)
    private authenticationRepository: Repository<Authentication>,
  ) {}

  /**
   * @returns {Promise<Authentication[]>}
   */
  async findAll(): Promise<Authentication[]> {
    return await this.authenticationRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<Authentication>}
   */
  async findOne(id: number): Promise<Authentication> {
    return await this.authenticationRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param authenticationData
   * @returns {Promise<Authentication>}
   */
  async create(authenticationData: Authentication): Promise<Authentication> {
    return await this.authenticationRepository.save(authenticationData);
  }

  /**
   * @param id
   * @param authenticationData
   * @returns {Promise<Authentication>}
   */
  async update(
    id: number,
    authenticationData: Authentication,
  ): Promise<Authentication> {
    await this.authenticationRepository.update({ id: id }, authenticationData);
    return await this.authenticationRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const authentication = await this.authenticationRepository.findOne({
      where: { id: id },
    });
    await this.authenticationRepository.remove(authentication);
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.authenticationRepository.clear();
  }
}
