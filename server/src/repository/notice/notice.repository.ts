import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NoticeEntity } from '#entity/notice';

@Injectable()
export class NoticeRepository {
  constructor(
    /**
     * @description
     * Repository Injection
     */
    @InjectRepository(NoticeEntity)
    private noticeRepository: Repository<NoticeEntity>,
  ) {}

  /**
   * @returns {Promise<NoticeEntity[]>}
   */
  async findAll(): Promise<NoticeEntity[]> {
    return this.noticeRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<NoticeEntity>}
   */
  async findOne(id: number): Promise<NoticeEntity | null> {
    return this.noticeRepository.findOne({
      where: { notice_id: id },
    });
  }

  /**
   * @param noticeData
   * @returns {Promise<NoticeEntity>}
   */
  async create(noticeData: NoticeEntity): Promise<NoticeEntity> {
    return this.noticeRepository.save(noticeData);
  }

  /**
   * @param id
   * @param noticeData
   * @returns {Promise<NoticeEntity>}
   */
  async update(id: number, noticeData: NoticeEntity): Promise<NoticeEntity | null> {
    await this.noticeRepository.update({ notice_id: id }, noticeData);
    return this.noticeRepository.findOne({
      where: { notice_id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const notice = await this.noticeRepository.findOne({
      where: { notice_id: id },
    });
    if (notice) {
      await this.noticeRepository.remove(notice);
    }
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.noticeRepository.clear();
  }
}
