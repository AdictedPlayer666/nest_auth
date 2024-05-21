import { Controller, Body,  Get, Post, Delete, Param, Header, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { IdDto } from './dto/id.dto';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(
      private readonly userService: UserService,

    ) {}

    @ApiTags('get_user')
    @Get(':id')
    // @UseGuards(getDataGuard)
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
