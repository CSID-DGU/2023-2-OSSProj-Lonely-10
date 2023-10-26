import { Module } from '@nestjs/common';
import { NoticeEntity } from '#entity/notice';
import { ScheduleEntity } from '#entity/schedule';
import { UserEntity } from '#entity/user';
import { EnrolmentEntity } from '#entity/enrolment';

@Module({
  imports: [NoticeEntity, ScheduleEntity, UserEntity, EnrolmentEntity],
})
export class MainModule {}
