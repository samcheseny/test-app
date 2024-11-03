import { Exclude, Expose } from "class-transformer";

export class UserDto {
  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
  @Expose({ name: 'token_type' })
  email: string;

  // @Exclude({ toPlainOnly: true })
  password: string;

  createdAt: Date;

  lastUpdatedAt: Date;

  deletedAt: Date;

  randomDate: Date
}
