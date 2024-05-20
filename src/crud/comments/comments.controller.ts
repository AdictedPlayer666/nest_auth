import { Controller, Body,  Get, Post, Delete, Param, Header, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IdDto } from '../user/dto/id.dto';
import { BadGatewayException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { col } from 'sequelize';
import { ColumnDto } from '../column/dto/column.dto';
import { Col } from 'sequelize/types/utils';
import { UUID } from 'crypto';
import { CardDto } from '../card/dto/card.dto';
import { CommnetDto } from './dto/comment.dto';
import { Not } from 'typeorm';
import { CommentsService } from './comments.service';

@Controller('user/:id/columns/:column_name/cards/:card_name/comments/')
export class CommentsController {
    constructor(
      private readonly commentService: CommentsService,
    ) {}

    @ApiTags('create_comment')
    @Post('add')
    // @UseGuards(ColumnGuard)
    @UsePipes(new ValidationPipe())
    async addComment(
      @Param('id') id: CommnetDto["id"],
      @Param('column_name') column_name: CommnetDto["column_name"],
      @Param('card_name') card_name: CommnetDto["card_name"],
      @Body('comment_name') comment_name: CommnetDto["comment_name"] ){

        const created = await this.commentService.createComment(id, column_name, card_name, comment_name);
        if (created) {
          return { message: 'Comment created successfully' };
        }
        throw new BadRequestException("Create error");
    }

    @ApiTags('get_comment')
    @Get(':comment_name')
    // @UseGuards(ColumnGuard)
    @UsePipes(new ValidationPipe())
    async getComment(@Param() comDto: CommnetDto){
      const commentExisted = await this.commentService.commentExisted(comDto.id, comDto.column_name, comDto.card_name, comDto.comment_name);

      if(commentExisted)
        {
          const commnet = await this.commentService.getComment(comDto.id, comDto.column_name, comDto.card_name, comDto.comment_name);
          return { commnet }
        }
        throw new NotFoundException("comment not found");
    }

    @ApiTags('delete_comment')
    @Delete('comment_name')
    // @UseGuards(ColumnGuard)
    @UsePipes(new ValidationPipe())
    async deleteComment(@Param() comDto: CommnetDto)
    {
      const commentExisted = await this.commentService.commentExisted(comDto.id, comDto.column_name, comDto.card_name, comDto.comment_name);
      if(commentExisted)
        {
          const deleted = await this.commentService.deleteCommentq(comDto.id, comDto.column_name, comDto.card_name, comDto.comment_name);
          if(deleted)
          {
            return { message: 'Column deleted successfully' };
          }
          throw new BadRequestException("Delete error");
        }
        throw new NotFoundException("comment not found");
    }
}