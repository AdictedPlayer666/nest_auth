import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './auth.service';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './database/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'abc123',
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