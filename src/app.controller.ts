import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './service/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<UserDto> {
    return this.userService.save(loginDto);
  }

  @Get('users/:id')
  @HttpCode(200)
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    return this.userService.findOne(id);
  }
}
