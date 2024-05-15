import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { DatabaseConfig } from './interfaces/database.interfaces';
import dbConfig from './config/database.config'



  @Module({
    imports: [
      TypeOrmModule.forRoot(dbConfig),
      TypeOrmModule.forFeature([Users]),
    ],
  })
  export class DatabaseModule {}