import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { SecretKey } from './secret-key.entity';


  @Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'closedsource149',
        database: 'pure',
        entities: [__dirname + '/../**/*.entity{.js,.ts}'], // Правильный синтаксис для автоматического обнаружения Entity-классов
        synchronize: false, // Установите false в продакшене
      }),
      TypeOrmModule.forFeature([Users, SecretKey]),
    ],
  })
  export class DatabaseModule {}