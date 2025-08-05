/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AdminRoles } from 'src/enums/admin.roles.enum';
import { UserType } from 'src/enums/user.type.enum';

export class OnboardingDTO {
  @IsOptional()
  @IsString()
  access?: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email_address: string;

  @IsOptional()
  @IsEnum(AdminRoles)
  role?: AdminRoles;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;

}
