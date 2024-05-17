import { Injectable } from '@nestjs/common';
import { Users } from '../../database/schema/user.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) 
    private readonly userRepository: Repository<Users>
  ) {}


  async ExistedUser(user_id: uuidv4): Promise<boolean> {
    if (!this.userRepository) {
      throw new Error('userRepository is not defined or is undefined');
    }

    const user = await this.userRepository.findOne({ where: { user_id } });
    return !!user; 
  }


  async getUser(user_id: uuidv4): Promise<string> {
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (user) { 
      return JSON.stringify(user);
    } else {
      return ''; 
    }

  }
}