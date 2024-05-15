import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Users } from './database/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Users)  
    private readonly userRepository: Repository<Users>
  ) {}


async validateUser(username: string, password: string): Promise<boolean> {
  if (!this.userRepository) {
    throw new Error('userRepository is not defined or is undefined');
  }

  const user = await this.userRepository.findOne({ where: { username, password } });
  return !!user; 
}


  async signPayload(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }


  async createUser(userDto: AuthDto): Promise<any> {
    try {
      const newUser = await this.userRepository.create(userDto);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new Error('User registration failed: ' + error.message);
    }
  }
}