/* eslint-disable prettier/prettier */
import { AdminAccess } from 'src/enums/admin.access.enum';
import { AdminRoles } from 'src/enums/admin.roles.enum';
import { UserStatus } from 'src/enums/user.status.enum';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'admins' })
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true, default: '' })
  photo_url?: string;

  @Column({ unique: true })
  email_address: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  is_email_verified: boolean;

  @Column({ unique: true, nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  iso_code: string;

  @Column({ type: 'enum', enum: AdminAccess })
  access: AdminAccess;

  @Column({ type: 'enum', enum: AdminRoles })
  role: AdminRoles;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  next_login?: Date | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  last_login?: Date | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
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
