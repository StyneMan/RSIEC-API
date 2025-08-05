/* eslint-disable prettier/prettier */
// import { Type } from 'class-transformer';
import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsObject, IsPhoneNumber, IsString, IsUrl, ValidateNested } from 'class-validator';
import { ApplicationCategory } from 'src/enums/application.category.enum';
import { QualificationType } from 'src/enums/qualification.type.enum';

class BankItem {
  @IsNotEmpty()
  @IsString()
  bankCode: string;

  @IsNotEmpty()
  @IsString()
  accName: string;

  @IsNotEmpty({ message: "Account number is required" })
  @IsString()
  accNum: string;

  @IsNotEmpty()
  @IsString()
  bankName: string;;

}

export class SaveApplicationDTO {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email_address: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  lga: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested ({ each: true })
  @Type(() => BankItem)
  bank_info: BankItem;
  
  @IsNotEmpty()
  @IsEnum(QualificationType)
  qualification: QualificationType;

  @IsNotEmpty()
  @IsBoolean()
  has_experience: boolean;

  @IsNotEmpty()
  @IsBoolean()
  is_computer_literate: boolean;
  
  @IsNotEmpty()
  @IsUrl()
  passport: string;
  
  @IsNotEmpty()
  @IsUrl()
  other_doc: string;

  @IsNotEmpty()
  @IsUrl()
  degree_cert: string;

  @IsNotEmpty()
  @IsEnum(ApplicationCategory)
  category: ApplicationCategory;
  
}
