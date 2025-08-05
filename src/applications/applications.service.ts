/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from 'src/entities/admin.entity';
import { AdminAccess } from 'src/enums/admin.access.enum';
import { Application } from 'src/entities/application.entity';
import { SaveApplicationDTO } from './dtos/submit.application.dto';
import { UpdateApplicationDTO } from './dtos/update.application.dto';
import { Email } from 'src/entities/emails.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { applicationHtmlContent } from 'src/utils/application.email';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Email)
    private readonly contactRepository: Repository<Email>,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private readonly mailService: MailerService
  ) {}

  async allApplications() {
    return await this.applicationRepository.find({});
  }

  async saveApplication(payload: SaveApplicationDTO) {
    if (!payload) {
      throw new HttpException('Payload not provided!', HttpStatus.BAD_REQUEST);
    }

    // First check if this email is already taken
    const emailTaken = await this.applicationRepository.findOne({
      where: { email_address: payload?.email_address }
    });

    if (emailTaken) {
      throw new HttpException("Email address already taken", HttpStatus.BAD_REQUEST);
    }

    // First check if this email is already taken
    const phoneTaken = await this.applicationRepository.findOne({
      where: { phone_number: payload?.phone_number }
    });

    if (phoneTaken) {
      throw new HttpException("Phone number already taken", HttpStatus.BAD_REQUEST);
    }

    const newZone = this.applicationRepository.create({
      address: payload?.address,
      email_address: payload?.email_address,
      first_name: payload?.first_name,
      last_name: payload?.last_name,
      lga: payload?.lga,
      state: payload?.state,
      bank_info: {
        accName: payload?.bank_info?.accName,
        accNum: payload?.bank_info?.accNum,
        bankCode: payload?.bank_info?.bankCode,
        bankName: payload?.bank_info?.bankName
      },
      qualification: payload?.qualification,
      has_experience: payload?.has_experience,
      degree_cert: payload?.degree_cert,
      is_computer_literate: payload?.is_computer_literate,
      other_doc: payload?.other_doc,
      passport: payload?.passport,
      phone_number: payload?.phone_number,
      category: payload?.category,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const savedApplication = await this.applicationRepository.save(newZone);

    // Now save to contacts
    const contact = this.contactRepository.create({
      email_address: payload?.email_address,
      phone_number: payload?.phone_number,
      created_at: new Date(),
      updated_at: new Date()
    });
    await this.contactRepository.save(contact);

    // SEND EMAIL HERE
    try {
      await this.mailService.sendMail({
            to: payload?.email_address,
            subject: 'New RSIEC Application',
            html: applicationHtmlContent(payload?.first_name +" "+payload?.last_name),
          });
    } catch (error) {
      console.log("ERROR ::: ", error);
      // throw error;
    }

    return {
      message: 'Application submitted successfully',
      data: savedApplication
    };
  }

  async all(page: number, limit: number) {
    const skip = (page - 1) * limit; // Calculate the number of records to skip

    const [data, total] = await Promise.all([
      this.applicationRepository
        .createQueryBuilder('application')
        .skip(skip) // Skip the records
        .take(limit) // Limit the number of records returned
        .getMany(), // Execute query to fetch data
      this.applicationRepository.count(), // Count total documents for calculating total pages
    ]);

    return {
      data,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      perPage: limit,
    };
  }

  async findApplicationById(applicationID: string) {
    const application = await this.applicationRepository.findOne({
      where: { id: applicationID },
    });

    if (!application) {
      return null;
    }

    return application;
  }

  async updateApplication(
    email_address: string,
    applicationId: string,
    payload: UpdateApplicationDTO,
  ) {
    if (!payload) {
      throw new HttpException('Payload not provided!', HttpStatus.BAD_REQUEST);
    }

    const adm = await this.adminRepository.findOne({
      where: { email_address },
    });

    if (!adm)
      throw new HttpException('No admin record found.', HttpStatus.NOT_FOUND);

    if (adm.access !== AdminAccess.READ_WRITE) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'You do not have necessary privileges for this action',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const application = await this.applicationRepository.findOne({
      where: { id: applicationId },
    });

    if (!application) {
      throw new HttpException(
        {
          message: 'No application found with the given ID',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const updateApplication = this.applicationRepository.create({
      ...application,
      ...payload,
    });

    const updatedApplication = await this.applicationRepository.save(updateApplication);

    return {
      message: 'Application updated successfully',
      data: updatedApplication,
    };
  }

  async deleteApplication(email_address: string, applicationId: string) {
    const adm = await this.adminRepository.findOne({
      where: { email_address },
    });

    if (!adm)
      throw new HttpException('No admin record found.', HttpStatus.NOT_FOUND);

    if (
      
      adm.access !== AdminAccess.READ_WRITE
    ) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'You do not have necessary privileges for this action',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const application = await this.adminRepository.findOne({
      where: { id: applicationId },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    await this.applicationRepository.softDelete(applicationId);

    return {
      message: 'Application deleted successfully',
    };
  }
  
}
