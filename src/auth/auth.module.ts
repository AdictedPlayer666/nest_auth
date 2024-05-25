import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './services/auth.service';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../database/schema/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import jwt_key from '../config/jwt_key'
import { UserService } from 'src/crud/user/services/user.service';
import { Columns } from 'src/database/schema/column.entity';
import { Comments } from 'src/database/schema/comment.entity';
import { Cards } from 'src/database/schema/card.entity';
import { CommentsService } from 'src/crud/comment/services/comments.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: jwt_key().secretKey,
        signOptions: { expiresIn: '1h' },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
    TypeOrmModule.forFeature([Users, Columns, Cards, Comments]),

  ],
  controllers: [AuthController],
  exports: [JwtAuthService, JwtModule],
  providers: [JwtAuthService, UserService]
})
export class AuthModule { }