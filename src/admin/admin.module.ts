/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { AdminOTP } from 'src/entities/otp.admin.entity';
import { AdminAuthService } from 'src/auth/auth-services/admin.auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AdminActivity } from 'src/entities/admin.activity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, AdminOTP, AdminActivity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    // SocketModule,
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminAuthService,
  ],
})
export class AdminModule {}
