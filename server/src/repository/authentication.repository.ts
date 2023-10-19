import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationEntity } from 'src/entity/authentication.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationRepository {
  constructor(
    @InjectRepository(AuthenticationEntity)
    private authenticationRepository: Repository<AuthenticationEntity>,
  ) {}

  /**
   * @returns {Promise<AuthenticationEntity[]>}
   */
  async findAll(): Promise<AuthenticationEntity[]> {
    return await this.authenticationRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<AuthenticationEntity>}
   */
  async findOne(id: number): Promise<AuthenticationEntity> {
    return await this.authenticationRepository.findOne({
      where: { authentication_id: id },
    });
  }

  /**
   * @param authenticationData
   * @returns {Promise<Authentication>}
   */
  async create(
    authenticationData: AuthenticationEntity,
  ): Promise<AuthenticationEntity> {
    return await this.authenticationRepository.save(authenticationData);
  }

  /**
   * @param id
   * @param authenticationData
   * @returns {Promise<Authentication>}
   */
  async update(
    id: number,
    authenticationData: AuthenticationEntity,
  ): Promise<AuthenticationEntity> {
    await this.authenticationRepository.update(
      { authentication_id: id },
      authenticationData,
    );
    return await this.authenticationRepository.findOne({
      where: { authentication_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const authentication = await this.authenticationRepository.findOne({
      where: { authentication_id: id },
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
