import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../database/schema/user.entity'; 
import { DatabaseModule } from 'src/database/database.module';
import { Columns } from 'src/database/schema/column.entity';
import { Cards } from 'src/database/schema/card.entity';
import { Comments } from 'src/database/schema/comment.entity';

@Module({
  controllers: [UserController],
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Users, Columns, Cards, Comments]),
  ],
  providers: [UserService]
})
export class UserModule {}
