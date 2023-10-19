import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/entity/user.entity';
import { CourseEntity } from 'src/entity/course.entity';
import { EnrollmentEntity } from 'src/entity/enrollment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, CourseEntity, EnrollmentEntity]),
  ],
  controllers: [],
  providers: [],
})
export class EnrollmentModule {}
