import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './user.entity';
import { Connection, Repository } from 'typeorm';
import { CreateUser } from '../create-dto';

@Injectable()
export class AuthService {

  private userRepository: Repository<UserEntity>;

  constructor(
    private jwtService: JwtService,
    public readonly connection: Connection
  ) {

    this.userRepository = this.connection.getRepository(UserEntity);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({where:{email}});
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async addUser(createUser: CreateUser):Promise<UserEntity>{
    if ((await this.userRepository.findOne({ email: createUser.email }))) {
      throw new ConflictException('User already exist');
    }
    const newUser = this.userRepository.create(createUser);
    return this.userRepository.save(newUser);
  }
}
