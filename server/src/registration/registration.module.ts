import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseEntity } from '#entity/course';
import { CourseInfoEntity } from '#entity/courseInfo';
import { EnrolmentEntity } from '#entity/enrolment';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, CourseInfoEntity, EnrolmentEntity])],
})
export class RegistrationModule {}
