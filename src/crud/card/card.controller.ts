import { Controller, Body,  Get, Post, Delete, Param, Header, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IdDto } from '../user/dto/id.dto';
import { BadGatewayException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { col } from 'sequelize';
import { ColumnDto } from '../user/dto/column.dto';
import { getDataGuard } from '../user/guards/user.guard';
import { Col } from 'sequelize/types/utils';
import { ColumnGuard } from '../user/guards/column.guard';
import { UUID } from 'crypto';
import { CardDto } from '../user/dto/card.dto';
import { CommnetDto } from '../user/dto/comment.dto';
import { Not } from 'typeorm';
import { CardService } from './card.service';

@Controller('user/:id/columns/:column_name/cards/')
export class CardController {
    constructor(
      private readonly cardService: CardService,
    ) {}
    @ApiTags('create_card')
    @Post('add')
    @UseGuards(ColumnGuard)
    @UsePipes(new ValidationPipe())
    async createCards(@Param('id') id: ColumnDto["id"], @Param('column_name') column_name: ColumnDto["column_name"] , @Body('card_name') card_name: string ) {
      const created = await this.cardService.createCard(id, card_name, column_name);  
      if (created) {
        return { message: 'Card created successfully' };
      }
      throw new BadRequestException("Create error");
    }


    @ApiTags('get_card')
    @Get(':card_name')
    @UseGuards(ColumnGuard)
    @UsePipes(new ValidationPipe())
    async getCards(@Param() cardDto: CardDto) {
      const cardExisted = await this.cardService.cardExisted(cardDto.id, cardDto.column_name, cardDto.card_name);
      if(cardExisted)
        {
          const card = await this.cardService.getCard(cardDto.id, cardDto.column_name, cardDto.card_name);
          return { card }
        }
        throw new NotFoundException("card not founded");
    }


    @ApiTags('delete_card')
    @Delete(':card_name')
    @UseGuards(ColumnGuard)
    @UsePipes(new ValidationPipe())
    async deleteCard(@Param() cardDto: CardDto) {
      const cardExisted = await this.cardService.cardExisted(cardDto.id, cardDto.column_name, cardDto.card_name);
      if(cardExisted)
        {
          const deleteCard = await this.cardService.deleteCard(cardDto.id, cardDto.column_name, cardDto.card_name);
          if(deleteCard)
            {
              return { message: 'Column deleted successfully' };
            }
            throw new BadRequestException("Card was not deleted");
        }
        throw new NotFoundException("card not founded");
    }
}
