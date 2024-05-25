import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '../../../database/schema/user.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Columns } from 'src/database/schema/column.entity';
import { Cards } from 'src/database/schema/card.entity';
import { Comments } from 'src/database/schema/comment.entity';
import { UserDto } from 'src/auth/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) 
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Columns)
    private readonly columnRepository: Repository<Columns>,
    @InjectRepository(Cards)
    private readonly cardRepository: Repository<Cards>,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) {}

  async getAll(){
      return await this.userRepository.find();
  }

  async getUser(user_id: uuidv4): Promise<string> {
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (user) { 
      return JSON.stringify(user);
    } 
    throw new NotFoundException("User not found");
  }
  
  async validateUser(userDto: UserDto): Promise<boolean> {
    if (!this.userRepository) {
      throw new Error('userRepository is not defined or is undefined');
    }

    const user = await this.userRepository.findOne({ where: { username: userDto.username, password: userDto.password } });
    return !!user; 
  }

  async createUser(userDto: UserDto): Promise<any> {

    const user_exist = await this.validateUser(userDto);

    if(user_exist) throw new BadRequestException("User existed");

    try {
      const newUser = await this.userRepository.create(userDto);
      await this.userRepository.save(newUser);
      
      if(newUser){
        return newUser;
      }
      
    } catch (error) {
      throw new Error('User registration failed: ' + error.message);
    }
  }
}