import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseEntity } from '#entity/course';
import { TodoEntity } from '#entity/todo';
import { ScoreEntity } from '#entity/score';
import { AttendanceEntity } from '#entity/attendance';
import { AnnouncementEntity } from '#entity/announcement';
import { AssignmentEntity } from '#entity/assignment';
import { EnrolmentEntity } from '#entity/enrolment';

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
