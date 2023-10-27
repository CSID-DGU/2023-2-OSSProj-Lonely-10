import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnnouncementEntity } from '#entity/announcement';
import { AssignmentEntity } from '#entity/assignment';
import { AttendanceEntity } from '#entity/attendance';
import { CourseEntity } from '#entity/course';
import { EnrolmentEntity } from '#entity/enrolment';
import { ScoreEntity } from '#entity/score';
import { TodoEntity } from '#entity/todo';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CourseEntity,
      TodoEntity,
      ScoreEntity,
      AttendanceEntity,
      AnnouncementEntity,
      AssignmentEntity,
      EnrolmentEntity,
    ]),
  ],
})
export class EclassModule {}
