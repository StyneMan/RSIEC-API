/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { AdminOTP } from './entities/otp.admin.entity';
import { FAQ } from './entities/faq.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AdminActivity } from './entities/admin.activity.entity';
import { Admin } from './entities/admin.entity';
import { AppController } from './app.controller';
import { Legal } from './entities/legal.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupportsModule } from './supports/supports.module';
import { Application } from './entities/application.entity';
import { ApplicationModule } from './applications/applications.module';
import { Email } from './entities/emails.entity';
import { Support } from './entities/support.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        legacySpatialSupport: false,
        entities: [Admin, AdminOTP, Application, FAQ, Legal, AdminActivity, Email, Support],
        cache: false,
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    JwtModule.register({
      secret:
        process.env.JWT_SECRET || 'abcdRsiec123INECJakasMan123@09nmdhyuDiloe((30(())',
      signOptions: { expiresIn: '1d' },
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: +configService.get<number>('MAIL_PORT'),
          secure: true,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: `"RSIEC" <${configService.get<string>('MAIL_USER')}>`,
        },
      }),
      inject: [ConfigService],
    }),
    // ServeStaticModule.forRoot(
    //   {
    //     rootPath: join(__dirname, '..', 'uploads'), // Specify the directory where your upload files are located
    //     serveRoot: '/uploads', // Specify the route prefix under which to serve the files
    //   },
    //   {
    //     rootPath: join(__dirname, '..', 'views'),
    //     serveRoot: '/views',
    //   },
    // ),
    AuthModule,
    AdminModule,
    SupportsModule,
    ApplicationModule
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }

/* onTap() async {

  await controller.getBonuses(item['id'])

 }


*/