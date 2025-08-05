/* eslint-disable prettier/prettier */
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationStatus } from 'src/enums/application.status.enum';
import { QualificationType } from 'src/enums/qualification.type.enum';
import { ApplicationCategory } from 'src/enums/application.category.enum';

export type Bank = {
  accName: string;
  accNum: string;
  bankCode: string;
  bankName: string;
};

@Entity({ name: 'applications' })
export class Application {
  @PrimaryGeneratedColumn('uuid') // This will generate UUID automatically
  id: string;

  @Column({ type: 'text', nullable: false })
  first_name: string;

  @Column({ type: 'text', nullable: false })
  last_name: string;

  @Column({ unique: true, nullable: false })
  email_address: string;

  @Column({ unique: true, nullable: false })
  phone_number: string;

  @Column({ type: 'text', nullable: true })
  lga: string;

  @Column({ type: 'text', nullable: true })
  state: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'enum', enum: QualificationType, nullable: false })
  qualification: QualificationType;

  @Column({ type: 'boolean', default: false })
  has_experience: boolean;

  @Column({ type: 'boolean', default: false })
  is_computer_literate: boolean;

  @Column({ type: 'json', nullable: false })
  bank_info?: Bank;

  @Column({ nullable: false })
  passport: string;

  @Column({ nullable: false })
  other_doc: string;

  @Column({ nullable: false })
  degree_cert: string;

  @Column({ type: 'enum', enum: ApplicationCategory })
  category: ApplicationCategory;

  @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.Submitted })
  status: ApplicationStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column()
  updated_at: Date;

  @BeforeInsert()
  updateDates() {
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  updateAgain() {
    this.updated_at = new Date();
  }
}
