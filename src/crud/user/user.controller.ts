import { Controller, Body,  Get, Post, Delete, Param, Header, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { v4 as uuidv4 } from 'uuid';
import { IdDto } from './dto/id.dto';
import { BadGatewayException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { col } from 'sequelize';
import { ColumnDto } from './dto/column.dto';
import { getDataGuard } from './guards/user.guard';
import { Col } from 'sequelize/types/utils';
import { ColumnGuard } from './guards/column.guard';
import { UUID } from 'crypto';
import { CardDto } from './dto/card.dto';
import { CommnetDto } from './dto/comment.dto';
import { Not } from 'typeorm';


@Controller('user')
export class UserController {
    constructor(
      private readonly userService: UserService,

    ) {}

    @ApiTags('get_user')
    @Get(':id')
    @UseGuards(getDataGuard)
    @UsePipes(new ValidationPipe())
    async id_get(@Param() indDto: IdDto) {
      
      const exist_user = await this.userService.ExistedUser(indDto.id);

      if(exist_user)
        {
          const user_data = await this.userService.getUser(indDto.id);
          return { user_data };
        }

        throw new BadRequestException("Bad request");
        
    }

    

    

    

}
