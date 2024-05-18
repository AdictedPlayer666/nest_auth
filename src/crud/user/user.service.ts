import { Injectable } from '@nestjs/common';
import { Users } from '../../database/schema/user.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Columns } from 'src/database/schema/column.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) 
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Columns)
    private readonly columnRepository: Repository<Columns>
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

  async ExistedColumnData(user_id: uuidv4, column_name: string): Promise<Boolean> {
    const columnEx = await this.columnRepository.findOne({where: {user_id, column_name}});
    return !!columnEx;
  }

  async GetColumnData(user_id: uuidv4, column_name: string): Promise<string>{
    const columnEx = await this.columnRepository.findOne({where: {user_id, column_name}});
    return JSON.stringify(columnEx);
  }

  async deleteColumn(user_id: uuidv4, column_name: string): Promise<boolean> {
    const deletedColumn = await this.columnRepository.delete({ user_id, column_name });
    return !!deletedColumn.affected;
  }
  
  async createColumn(user_id: uuidv4, column_name: string): Promise<boolean> {
    const newColumn = this.columnRepository.create({ user_id, column_name });
    const createdColumn = await this.columnRepository.save(newColumn);
    return !!createdColumn;
  }


}