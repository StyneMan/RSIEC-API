/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminAuthService } from './auth-services/admin.auth.service';
import { AdminService } from 'src/admin/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AdminOTP } from 'src/entities/otp.admin.entity';
import { AdminActivity } from 'src/entities/admin.activity.entity';
import { LocalStrategy } from './utils/local_strategy';
import { JwtStrategy } from './utils/jwt_strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, AdminOTP, AdminActivity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'abcdRsiec123INECJakasMan123@09nmdhyuDiloe((30(())',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AdminService,
    AdminAuthService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
