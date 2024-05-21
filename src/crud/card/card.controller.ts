import { Controller, Body,  Get, Post, Delete, Param, Header, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ColumnDto } from '../column/dto/column.dto';
import { CardDto } from './dto/card.dto';
import { CardService } from './card.service';
import { OwnerGuard } from 'src/auth/guards/owner.guard';
@Controller('user/:id/columns/:column_name/cards/')
export class CardController {
    constructor(
      private readonly cardService: CardService,
    ) {}
    @ApiTags('create_card')
    @Post('add')
    @UseGuards(OwnerGuard)
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
    // @UseGuards(ColumnGuard)
    @UsePipes(new ValidationPipe())
    async getCards(@Param() cardDto: CardDto) {
      const card = await this.cardService.getCard(cardDto.id, cardDto.column_name, cardDto.card_name);
      return { card };
    }


    @ApiTags('delete_card')
    @Delete(':card_name')
    @UseGuards(OwnerGuard)
    // @UseGuards(ColumnGuard)
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
