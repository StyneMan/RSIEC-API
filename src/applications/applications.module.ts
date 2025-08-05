/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { Application } from 'src/entities/application.entity';
import { ApplicationController } from './applications.controller';
import { ApplicationService } from './applications.service';
import { Email } from 'src/entities/emails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Application, Admin, Email])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
