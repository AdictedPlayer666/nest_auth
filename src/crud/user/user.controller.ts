import { Controller, Get, Post, Delete, Param, Header } from '@nestjs/common';
import { UserService } from './user.service';
import { v4 as uuidv4 } from 'uuid';
import { IdDto } from './dto/id.dto';
import { BadGatewayException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

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

}
