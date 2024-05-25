
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '../../../database/schema/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Columns } from 'src/database/schema/column.entity';
import { Cards } from 'src/database/schema/card.entity';
import { Comments } from 'src/database/schema/comment.entity';
import { UserDto } from 'src/auth/dto/user.dto';
import { CommnetDto } from '../dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Columns)
    private readonly columnRepository: Repository<Columns>,
    @InjectRepository(Cards)
    private readonly cardRepository: Repository<Cards>,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) { }

  async commentExisted(user_id: uuidv4, column_name: string, card_name: string, comment_name: string): Promise<boolean> {
    if (!this.cardRepository) {
      throw new Error('cardRepository is not defined or is undefined');
    }

    const column = await this.columnRepository.findOne({ where: { user_id, column_name } });
    const column_id = column?.column_id;

    const card = await this.cardRepository.findOne({ where: { user_id, column_id, card_name } });
    const card_id = card?.card_id;

    const comments = await this.commentRepository.findOne({ where: { user_id, column_id, card_id, comment_name } });
    return !!comments;
  }


  async getComment(comDto: CommnetDto): Promise<string> {

    if (!this.cardRepository) {
      throw new Error('cardRepository is not defined or is undefined');
    }

    const commentExisted = await this.commentExisted(comDto.id, comDto.column_name, comDto.card_name, comDto.comment_name);
    if (!commentExisted) {
      throw new NotFoundException("comment not found");
    }
    const column = await this.columnRepository.findOne({ where: { user_id: comDto.id, column_name: comDto.column_name } });
    const column_id = column?.column_id;

    const card = await this.cardRepository.findOne({ where: { user_id: comDto.id, column_id, card_name: comDto.card_name } });
    const card_id = card?.card_id;

    const comments = await this.commentRepository.findOne({ where: { user_id: comDto.id, column_id, card_id, comment_name: comDto.comment_name } });
    return JSON.stringify(comments);
  }

  async createComment(user_id: uuidv4, column_name: string, card_name: string, comment_name: string): Promise<any> {

    const column = await this.columnRepository.findOne({ where: { user_id, column_name } });
    const column_id = column?.column_id;

    const card = await this.cardRepository.findOne({ where: { user_id, column_id, card_name } });
    const card_id = card?.card_id;
    if (!column_id) return false;
    const newComment = this.commentRepository.create({ user_id, card_id, column_id, comment_name });
    const createdComment = await this.commentRepository.save(newComment);
    if (!createdComment) {
      throw new BadRequestException("Failed create comment!");
    }
    else {
      return { message: 'Comment created successfully' };
    }
  }

  async deleteCommentq(comDto: CommnetDto): Promise<any> {
    const commentExisted = await this.commentExisted(comDto.id, comDto.column_name, comDto.card_name, comDto.comment_name);
    if (!commentExisted) {
      throw new NotFoundException("comment not found");
    }
    const column = await this.columnRepository.findOne({ where: { user_id: comDto.id, column_name: comDto.column_name } });
    const column_id = column?.column_id;
    const card = await this.cardRepository.findOne({ where: { user_id: comDto.id, column_id, card_name: comDto.card_name } });
    const card_id = card?.card_id;
    const deleted = await this.commentRepository.delete({ user_id: comDto.id, column_id, card_id, comment_name: comDto.comment_name });
    if (deleted) {
      return { message: 'Comment     deleted successfully' };
    }
    throw new BadRequestException("Delete error");
  }

  async updateComment(comDto: CommnetDto, new_name: string): Promise<any> {

    if (!this.cardRepository) {
      throw new Error('cardRepository is not defined or is undefined');
    }

    const commentExisted = await this.commentExisted(comDto.id, comDto.column_name, comDto.card_name, comDto.comment_name);
    if (!commentExisted) {
      throw new NotFoundException("comment not found");
    }
    const column = await this.columnRepository.findOne({ where: { user_id: comDto.id, column_name: comDto.column_name } });
    const column_id = column?.column_id;

    const card = await this.cardRepository.findOne({ where: { user_id: comDto.id, column_id, card_name: comDto.card_name } });
    const card_id = card?.card_id;

    const comments = await this.commentRepository.findOne({ where: { user_id: comDto.id, column_id, card_id, comment_name: comDto.comment_name } });
    comments.comment_name = new_name;
    await this.commentRepository.save(comments);
    return true;
  }
}
