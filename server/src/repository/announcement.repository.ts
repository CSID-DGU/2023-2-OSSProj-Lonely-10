import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnouncementEntity } from 'src/entity/announcement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnnouncementRepository {
  constructor(
    @InjectRepository(AnnouncementEntity)
    private announcementRepository: Repository<AnnouncementEntity>,
  ) {}

  /**
   * @returns {Promise<AnnouncementEntity[]>}
   */
  async findAll(): Promise<AnnouncementEntity[]> {
    return await this.announcementRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<AnnouncementEntity>}
   */
  async findOne(id: number): Promise<AnnouncementEntity> {
    return await this.announcementRepository.findOne({
      where: { announcement_id: id },
    });
  }

  /**
   * @param announcementData
   * @returns {Promise<AnnouncementEntity>}
   */
  async create(
    announcementData: AnnouncementEntity,
  ): Promise<AnnouncementEntity> {
    return await this.announcementRepository.save(announcementData);
  }

  /**
   * @param id
   * @param announcementData
   * @returns {Promise<AnnouncementEntity>}
   */
  async update(
    id: number,
    announcementData: AnnouncementEntity,
  ): Promise<AnnouncementEntity> {
    await this.announcementRepository.update(
      { announcement_id: id },
      announcementData,
    );
    return await this.announcementRepository.findOne({
      where: { announcement_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const announcement = await this.announcementRepository.findOne({
      where: { announcement_id: id },
    });
    await this.announcementRepository.remove(announcement);
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.announcementRepository.clear();
  }
}
