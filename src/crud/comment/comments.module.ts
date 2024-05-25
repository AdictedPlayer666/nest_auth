import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../database/schema/user.entity';
import { Columns } from 'src/database/schema/column.entity';
import { Cards } from 'src/database/schema/card.entity';
import { Comments } from 'src/database/schema/comment.entity';
import { DatabaseModule } from 'src/database/database.module';
import { CommentsController } from './controllers/comments.controller';
import { UserService } from '../user/services/user.service';
import { CommentsService } from './services/comments.service';
import { JwtAuthService } from 'src/auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';  // Import JwtService

@Module({
  controllers: [CommentsController],
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Users, Columns, Cards, Comments]),
  ],
  providers: [UserService, CommentsService, JwtAuthService, JwtService],  // Provide JwtService here
})
export class CommentsModule { }