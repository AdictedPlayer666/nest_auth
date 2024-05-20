import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../database/schema/user.entity'; 
import { DatabaseModule } from 'src/database/database.module';
import { Columns } from 'src/database/schema/column.entity';
import { Cards } from 'src/database/schema/card.entity';
import { Comments } from 'src/database/schema/comment.entity';
import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { UserService } from '../user/user.service';
import { CardService } from './card.service';

@Module({
  controllers: [CardController],
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Users, Columns, Cards, Comments]),
  ],
  providers: [UserService, CardService]
})
export class CardModule {}
