import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../database/schema/user.entity';
import { Columns } from 'src/database/schema/column.entity';
import { Cards } from 'src/database/schema/card.entity'; // Import Cards entity
import { Comments } from 'src/database/schema/comment.entity'; // Import Comments entity
import { UserService } from '../user/services/user.service';
import { JwtAuthService } from 'src/auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { ColumnController } from './controllers/column.controller';
import { ColumnService } from './services/column.service';

@Module({
  controllers: [ColumnController],
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Users, Columns, Cards, Comments]),
  ],
  providers: [
    ColumnService,
    JwtService,
    Repository,
    UserService,
    JwtAuthService,

  ],
})
export class ColumnModule { }