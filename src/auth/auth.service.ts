import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Users } from '../database/schema/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { UserService } from 'src/crud/user/user.service';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Users)  
    private readonly userRepository: Repository<Users>,
    private readonly UserService: UserService,
  ) {}

  
  async validateUser(authdto: UserDto)
  {
    const user = await this.userRepository.findOne({ where: { username: authdto.username, password: authdto.password} });
    if (!user) {
      return false;
    }
    return true;
  }
  async validateToken(token: string): Promise<boolean> {
    try {
      const decoded = await this.jwtService.verify(token);
      const user = await this.userRepository.findOne({ where: { username: decoded.username } });

      if (!user) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  


  async signPayload(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }
  
}