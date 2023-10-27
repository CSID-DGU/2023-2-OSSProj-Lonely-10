import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnrolmentEntity } from '#entity/enrolment';
import { NoticeEntity } from '#entity/notice';
import { ScheduleEntity } from '#entity/schedule';
import { UserEntity } from '#entity/user';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeEntity, ScheduleEntity, UserEntity, EnrolmentEntity])],
})
export class MainModule {}
