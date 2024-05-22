import { Controller, Body,  Get, Post, Delete, Param, Header, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommnetDto } from './dto/comment.dto';
import { CommentsService } from './comments.service';
import { OwnerGuard } from '../../auth/guards/owner.guard';

@Controller('user/:id/columns/:column_name/cards/:card_name/comments/')
export class CommentsController {
    constructor(
      private readonly commentService: CommentsService,
    ) {}

    @ApiTags('create_comment')
    @UseGuards(OwnerGuard)
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
      
        const commnet = await this.commentService.getComment(comDto);
        return { commnet }
        
    }

    @ApiTags('delete_comment')
    @UseGuards(OwnerGuard)
    @Delete(':comment_name')
    // @UseGuards(ColumnGuard)
    @UsePipes(new ValidationPipe())
    async deleteComment(@Param() comDto: CommnetDto)
    {
      
      return await this.commentService.deleteCommentq(comDto);     
    }
}
