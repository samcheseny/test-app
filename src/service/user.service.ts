import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async save(loginDto: LoginDto): Promise<UserDto> {
    const user = new User({
      email: loginDto.email,
      password: loginDto.password,
    });
    const savedUser = await this.usersRepository.save(user);
    return new UserDto({});
  }
}
