import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './auth.service';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './database/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import jwt_key from '../config/jwt_key'


@Module({
  imports: [
    JwtModule.register({
      secret: jwt_key().secretKey,
      signOptions: { expiresIn: '1h' },
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([Users]),
    
  ],
  controllers: [AuthController],
  exports: [JwtAuthService],
  providers: [JwtAuthService]
})
export class AuthModule {}