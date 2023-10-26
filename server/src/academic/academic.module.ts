import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GradeEntity } from '#entity/grade';
import { UserEntity } from '#entity/user';
import { UserInfoEntity } from '#entity/userInfo';

@Module({
  imports: [TypeOrmModule.forFeature([GradeEntity, UserEntity, UserInfoEntity])],
})
export class AcademicModule {}
