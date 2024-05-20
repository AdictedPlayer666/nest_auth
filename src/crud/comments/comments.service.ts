
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '../../database/schema/user.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Columns } from 'src/database/schema/column.entity';
import { Cards } from 'src/database/schema/card.entity';
import { Comments } from 'src/database/schema/comment.entity';
import { UserDto } from 'src/auth/dto/user.dto';

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
    ) {}

    async commentExisted(user_id: uuidv4, column_name: string, card_name: string, comment_name: string): Promise<boolean> {
    if (!this.cardRepository) {
      throw new Error('cardRepository is not defined or is undefined');
    }

    const column = await this.columnRepository.findOne({ where: { user_id, column_name } });
    const column_id = column?.column_id;

    const card = await this.cardRepository.findOne({ where: { user_id, column_id, card_name} });
    const card_id = card?.card_id;

    const comments = await this.commentRepository.findOne({ where: { user_id, column_id, card_id, comment_name } });
    return !!comments; 
  }


  async getComment(user_id: uuidv4, column_name: string, card_name: string, comment_name: string): Promise<string> {
      if (!this.cardRepository) {
        throw new Error('cardRepository is not defined or is undefined');
      }

      const column = await this.columnRepository.findOne({ where: { user_id, column_name } });
      const column_id = column?.column_id;

      const card = await this.cardRepository.findOne({ where: { user_id, column_id, card_name} });
      const card_id = card?.card_id;

      const comments = await this.commentRepository.findOne({ where: { user_id, column_id, card_id, comment_name } });
      return JSON.stringify(comments);
  }

  async createComment(user_id: uuidv4, column_name: string, card_name: string, comment_name: string): Promise<boolean> {

    const column = await this.columnRepository.findOne({ where: { user_id, column_name } });
    const column_id = column?.column_id;

    const card = await this.cardRepository.findOne({ where: { user_id, column_id, card_name} });
    const card_id = card?.card_id;
    if(!column_id) return false;
    const newComment = this.commentRepository.create({ user_id, card_id, column_id, comment_name });
    const createdComment = await this.commentRepository.save(newComment);

    return !!createdComment;
}

    async deleteCommentq(user_id: uuidv4,column_name: string, card_name: string,  comment_name: string): Promise<boolean> {
      const column = await this.columnRepository.findOne({ where: { user_id, column_name } });
      const column_id = column?.column_id;
      const card = await this.cardRepository.findOne({ where: { user_id, column_id, card_name} });
      const card_id = card?.card_id;
      const deleted = await this.commentRepository.delete({ user_id, column_id, card_id, comment_name });
      return !!deleted.affected;
  }
}
