import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Users } from '../../database/schema/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../dto/user.dto';
import { UserService } from 'src/crud/user/services/user.service';
import { UUID } from 'crypto';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly UserService: UserService,
  ) { }

  async validateUser2(username1: string, user_id: UUID) {
    const user = await this.userRepository.findOne({ where: { username: username1, user_id: user_id } });
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
      }
    } catch (error) {
      return false;
    }
    return true;
  }




  async signPayload(userDto: UserDto): Promise<any> {
    const isValidUser = await this.UserService.validateUser(userDto);
    if (!isValidUser) {
      throw new BadRequestException("Err");
    }
    const payload = { username: userDto.username };
    return this.jwtService.sign(payload);
  }

}