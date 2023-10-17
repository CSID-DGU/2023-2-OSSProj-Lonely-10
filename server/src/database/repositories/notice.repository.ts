import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from '../entities/notice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeRepository {
  constructor(
    /**
     * @description
     * Repository Injection
     */
    @InjectRepository(Notice)
    private noticeRepository: Repository<Notice>,
  ) {}

  /**
   * @returns {Promise<Notice[]>}
   */
  async findAll(): Promise<Notice[]> {
    return await this.noticeRepository.find();
  }

  /**
   * @param id
   * @returns {Promise<Notice>}
   */
  async findOne(id: number): Promise<Notice> {
    return await this.noticeRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param noticeData
   * @returns {Promise<Notice>}
   */
  async create(noticeData: Notice): Promise<Notice> {
    return await this.noticeRepository.save(noticeData);
  }

  /**
   * @param id
   * @param noticeData
   * @returns {Promise<Notice>}
   */
  async update(id: number, noticeData: Notice): Promise<Notice> {
    await this.noticeRepository.update({ id: id }, noticeData);
    return await this.noticeRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * @param id
   */
  async delete(id: number): Promise<void> {
    const notice = await this.noticeRepository.findOne({
      where: { id: id },
    });
    await this.noticeRepository.delete(notice);
  }

  /**
   * @description
   * Delete All
   */
  async deleteAll(): Promise<void> {
    await this.noticeRepository.clear();
  }
}
