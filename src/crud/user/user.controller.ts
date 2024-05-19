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


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

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

    @ApiTags('get_column')
    @Get(':id/columns/:column_name')
    @UseGuards(getDataGuard)
    @UsePipes(new ValidationPipe())
    async findUserColumns(@Param() colDto: ColumnDto) {

      const ExistColumn = await this.userService.ExistedColumnData(colDto.id, colDto.column_name);
      if(ExistColumn){
        const column_data = await this.userService.GetColumnData(colDto.id, colDto.column_name);
        return { column_data }
      }

      throw new BadRequestException("Column not found");

    }

    @ApiTags('delete_column')
    @Delete(':id/columns/:column_name')
    @UseGuards(ColumnGuard)
    @UsePipes(new ValidationPipe())
    async DeleteColumn(@Param() colDto: ColumnDto)
    {
      const ExistColumn = await this.userService.ExistedColumnData(colDto.id, colDto.column_name);
      if (ExistColumn) {
        const deleted = await this.userService.deleteColumn(colDto.id, colDto.column_name);
        if(deleted)
          {
            return { message: 'Column deleted successfully' };
          }
          throw new BadRequestException("Delete error");
      }
      throw new NotFoundException("Column not found");
    }

    
    @ApiTags('create_column')
    @Post(':id/columns/add')  
    @UseGuards(ColumnGuard)
    @UsePipes(new ValidationPipe())
    async createColumn(@Param('id') id: ColumnDto["id"], @Body('column_name') column_name: ColumnDto["column_name"]) {
      const created = await this.userService.createColumn(id, column_name);  
      if (created) {
        return { message: 'Column created successfully' };
      }
      throw new BadRequestException("Create error");
    }

    @ApiTags('create_card')
    @Post(':id/columns/:column_name/cards/add')
    @UseGuards(ColumnGuard)
    @UsePipes(new ValidationPipe())
    async createCards(@Param('id') id: ColumnDto["id"], @Param('column_name') column_name: ColumnDto["column_name"] , @Body('card_name') card_name: string ) {
      const created = await this.userService.createCard(id, card_name, column_name);  
      if (created) {
        return { message: 'Card created successfully' };
      }
      throw new BadRequestException("Create error");
    }


    @ApiTags('get_card')
    @Get(':id/columns/:column_name/cards/:card_name')
    @UseGuards(ColumnGuard)
    @UsePipes(new ValidationPipe())
    async getCards(@Param() cardDto: CardDto) {
      const cardExisted = await this.userService.cardExisted(cardDto.id, cardDto.column_name, cardDto.card_name);
      if(cardExisted)
        {
          const card = await this.userService.getCard(cardDto.id, cardDto.column_name, cardDto.card_name);
          return { card }
        }
        throw new NotFoundException("card not founded");
    }


    @ApiTags('delete_card')
    @Delete(':id/columns/:column_name/cards/:card_name')
    @UseGuards(ColumnGuard)
    @UsePipes(new ValidationPipe())
    async deleteCard(@Param() cardDto: CardDto) {
      const cardExisted = await this.userService.cardExisted(cardDto.id, cardDto.column_name, cardDto.card_name);
      if(cardExisted)
        {
          const deleteCard = await this.userService.deleteCard(cardDto.id, cardDto.column_name, cardDto.card_name);
          if(deleteCard)
            {
              return { message: 'Column deleted successfully' };
            }
            throw new BadRequestException("Card was not deleted");
        }
        throw new NotFoundException("card not founded");
    }

    @ApiTags('create_commnet')
    @Post(':id/columns/:column_name/cards/:card_name/comments/add')
    @UseGuards(ColumnGuard)
    @UsePipes(new ValidationPipe())
    async addComment(
      @Param('id') id: CommnetDto["id"],
      @Param("column_name") column_name: CommnetDto["column_name"],
      @Param("card_name") card_name: CommnetDto["card_name"],
      @Body("comment_name") comment_name: CommnetDto["comment_name"] ){

        const created = await this.userService.createComment(id, column_name, card_name, comment_name);
        if (created) {
          return { message: 'Comment created successfully' };
        }
        throw new BadRequestException("Create error");
    }


}
