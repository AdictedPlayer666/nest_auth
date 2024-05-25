import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '../../../database/schema/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Columns } from 'src/database/schema/column.entity';
import { ColumnDto } from '../dto/column.dto';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Columns)
    private readonly columnRepository: Repository<Columns>,
  ) { }


  async GetColumnData(colDto: ColumnDto): Promise<string> {
    const ExistColumn = await this.ExistedColumnData(colDto);
    if (!ExistColumn) {
      throw new BadRequestException("Column not found");
    }
    const columnEx = await this.columnRepository.findOne({ where: { user_id: colDto.id, column_name: colDto.column_name } });
    return JSON.stringify(columnEx);
  }

  async deleteColumn(colDto: ColumnDto): Promise<any> {
    const ExistColumn = await this.ExistedColumnData(colDto);
    if (!ExistColumn) {
      throw new NotFoundException("Column not found");
    }
    const deletedColumn = await this.columnRepository.delete({ user_id: colDto.id, column_name: colDto.column_name });
    const deleted = !!deletedColumn.affected;
    if (deleted) {
      return { message: 'Column deleted successfully' };
    }
    throw new BadRequestException("Delete error");
  }

  async ExistedColumnData(colDto: ColumnDto): Promise<Boolean> {
    const columnEx = await this.columnRepository.findOne({ where: { user_id: colDto.id, column_name: colDto.column_name } });
    return !!columnEx;
  }

  async createColumn(user_id: uuidv4, column_name: string): Promise<any> {
    const newColumn = this.columnRepository.create({ user_id, column_name });
    const createdColumn = await this.columnRepository.save(newColumn);
    if (createdColumn) {
      return { message: 'Column created successfully' };
    }
    throw new BadRequestException("Create error");
  }
  async updateColumn(colDto: ColumnDto, new_name: string) {
    const columnEx = await this.columnRepository.findOne({ where: { user_id: colDto.id, column_name: colDto.column_name } });
    columnEx.column_name = new_name;
    await this.columnRepository.save(columnEx);
    return true;
  }
}
