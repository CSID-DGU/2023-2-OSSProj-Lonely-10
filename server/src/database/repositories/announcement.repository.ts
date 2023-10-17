import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from '../entities/announcement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnnouncementRepository {
  constructor(
    @InjectRepository(Announcement)
    private announcementRepository: Repository<Announcement>,
  ) {}

  /**
   * @returns {Promise<Announcement[]>}
   */
  async findAll(): Promise<Announcement[]> {
    return await this.announcementRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<Announcement>}
   */
  async findOne(id: number): Promise<Announcement> {
    return await this.announcementRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param announcementData
   * @returns {Promise<Announcement>}
   */
  async create(announcementData: Announcement): Promise<Announcement> {
    return await this.announcementRepository.save(announcementData);
  }

  /**
   * @param id
   * @param announcementData
   * @returns {Promise<Announcement>}
   */
  async update(
    id: number,
    announcementData: Announcement,
  ): Promise<Announcement> {
    await this.announcementRepository.update({ id: id }, announcementData);
    return await this.announcementRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const announcement = await this.announcementRepository.findOne({
      where: { id: id },
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
