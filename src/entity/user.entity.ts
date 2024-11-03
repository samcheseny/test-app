import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Exclude, Expose } from "class-transformer";

@Entity('users')
export class User {
  // constructor(email: string, password: string) {
  //   this.email = email;
  //   this.password = password;
  // }

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email' })
  @Expose({ name: 'token_type' })
  email: string;

  @Column({ name: 'password' })
  @Exclude()
  password: string;

  @VersionColumn({ name: 'version', type: 'int' })
  @Exclude()
  version: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_updated_at', type: 'timestamptz' })
  lastUpdatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date;

  @Column({ name: 'random_date', type: 'timestamptz' })
  randomDate: Date = new Date();
}
