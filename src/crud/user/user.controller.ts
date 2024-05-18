import { Controller, Get, Post, Delete, Param, Header } from '@nestjs/common';
import { UserService } from './user.service';
import { v4 as uuidv4 } from 'uuid';
import { IdDto } from './dto/id.dto';
import { BadGatewayException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { col } from 'sequelize';
import { ColumnDto } from './dto/cloumn.dto';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiTags('get_user')
    @Get(':id')
    @UsePipes(new ValidationPipe())
    async id_get(@Param() indDto: IdDto) {
      
      const exist_user = await this.userService.ExistedUser(indDto.id);

      if(exist_user)
        {
          const user_data = await this.userService.getUser(indDto.id);
          return { user_data };
        }

        throw new BadGatewayException('User already exists');
        
    }

    @ApiTags('get_column')
    @Get(':id/columns/:column_name')
    @UsePipes(new ValidationPipe())
    async findUserColumns(@Param() colDto: ColumnDto) {

    const ExistColumn = await this.userService.ExistedColumnData(colDto.id, colDto.column_name);
    if(ExistColumn){
      const column_data = await this.userService.GetColumnData(colDto.id, colDto.column_name);
      return { column_data }
    }

    return 'Oh no'

  }
}
