import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Users } from '../../database/schema/user.entity'; 
import { Columns } from 'src/database/schema/column.entity';
import { Cards } from 'src/database/schema/card.entity';
import { Comments } from 'src/database/schema/comment.entity';
import { CardController } from './card.controller';
import { UserService } from '../user/user.service';
import { CardService } from './card.service';
import { JwtAuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CardController],
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Users, Columns, Cards, Comments]),
  ],
  providers: [
    UserService, // Ensure UserService is provided
    CardService,
    JwtAuthService, 
    JwtService,
    // Any other necessary providers
  ],
})
export class CardModule {}