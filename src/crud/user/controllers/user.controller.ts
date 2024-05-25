import { Controller, Body,  Get, Post, Delete, Param, Header, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IdDto } from '../dto/id.dto';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(
      private readonly userService: UserService,

    ) {}

    @ApiTags('Get_allUsers')
    
    @Get('all')
    @UsePipes(new ValidationPipe())
    async get_allUser(){

      return await this.userService.getAll();
      
    }
    
    @ApiTags('get_user')
    @Get(':id')
    @UsePipes(new ValidationPipe())
    async id_get(@Param() indDto: IdDto) {
      
      return await this.userService.getUser(indDto.id);
        
    }

}
