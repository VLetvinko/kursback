import { Controller, Post, UseGuards, Request, Get, Res, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Connection, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUser } from '../create-dto';

@Controller('auth')
export class AuthController {

  private userRepository: Repository<UserEntity>;

  constructor(
    private readonly authService: AuthService,
    public readonly connection: Connection
  ) {
    this.userRepository = this.connection.getRepository(UserEntity);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/user/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/user/register')
  addUser(@Body() createUser: CreateUser, @Res() res): Promise<UserEntity>{
    return this.authService.addUser(createUser);
  }
}
