/* eslint-disable prettier/prettier */
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { ApplicationStatus } from 'src/enums/application.status.enum';
import { QualificationType } from 'src/enums/qualification.type.enum';

export class UpdateApplicationDTO {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsEmail()
  email_address?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone_number?: string;

  @IsOptional()
  @IsString()
  lga?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(QualificationType)
  qualification?: QualificationType;
  
  @IsOptional()
  @IsBoolean()
  has_experience?: boolean;
  
  @IsOptional()
  @IsUrl()
  passport?: string;
  
  @IsOptional()
  @IsUrl()
  other_doc?: string;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;
  
}
