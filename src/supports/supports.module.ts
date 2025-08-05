/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SupportsController } from './supports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Support } from 'src/entities/support.entity';
import { SupportsService } from './supports.service';
import { Admin } from 'src/entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Support, Admin])],
  controllers: [SupportsController],
  providers: [SupportsService],
})
export class SupportsModule {}
