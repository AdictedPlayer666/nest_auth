
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '../../../database/schema/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Columns } from 'src/database/schema/column.entity';
import { Cards } from 'src/database/schema/card.entity';
import { CardDto } from '../dto/card.dto';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        @InjectRepository(Columns)
        private readonly columnRepository: Repository<Columns>,
        @InjectRepository(Cards)
        private readonly cardRepository: Repository<Cards>,
    ) { }

    async createCard(user_id: uuidv4, card_name: string, column_name: string): Promise<any> {

        const cardExisted = await this.cardExisted(user_id, column_name, card_name);
        if (cardExisted) {
            throw new BadRequestException("Card arleady existed!");
        }

        const column = await this.columnRepository.findOne({ where: { user_id, column_name } });
        const column_id = column?.column_id;
        const newCard = this.cardRepository.create({ user_id, card_name, column_id });
        const createdCard = await this.cardRepository.save(newCard);
        if (createdCard) {
            return { message: 'Card created successfully' };
        }
        throw new BadRequestException("Create error");
    }
    async getCard(user_id: uuidv4, column_name: string, card_name: string): Promise<string> {

        const cardExisted = await this.cardExisted(user_id, column_name, card_name);
        if (!cardExisted) {
            throw new BadRequestException("Card not founded");
        }


        const column = await this.columnRepository.findOne({ where: { user_id, column_name } });
        const column_id = column?.column_id;
        const card = await this.cardRepository.findOne({ where: { user_id, column_id, card_name } });
        return JSON.stringify(card);
    }

    async cardExisted(user_id: uuidv4, column_name: string, card_name: string): Promise<boolean> {
        if (!this.cardRepository) {
            throw new Error('cardRepository is not defined or is undefined');
        }
        const column = await this.columnRepository.findOne({ where: { user_id, column_name } });
        const column_id = column?.column_id;
        const card = await this.cardRepository.findOne({ where: { user_id, column_id, card_name } });
        return !!card;
    }

    async deleteCard(cardDto: CardDto): Promise<any> {
        const cardExisted = await this.cardExisted(cardDto.id, cardDto.column_name, cardDto.card_name);
        if (!cardExisted) {
            throw new NotFoundException("card not founded");
        }
        const column = await this.columnRepository.findOne({ where: { user_id: cardDto.id, column_name: cardDto.column_name } });
        const column_id = column?.column_id;

        const deletedColumn = await this.cardRepository.delete({ user_id: cardDto.id, column_id, card_name: cardDto.card_name });
        if (!!deletedColumn.affected) {
            return { message: 'Card deleted successfully' };
        }
        throw new BadRequestException("Card was not deleted");
    }
    async updateCard(cardDto: CardDto, new_name: string) {
        const column = await this.columnRepository.findOne({ where: { user_id: cardDto.id, column_name: cardDto.column_name } });
        const column_id = column?.column_id;
        const card = await this.cardRepository.findOne({ where: { user_id: cardDto.id, column_id, card_name: cardDto.card_name } });
        card.card_name = new_name;
        await this.cardRepository.save(card);
        return "Card updated";
    }
}
