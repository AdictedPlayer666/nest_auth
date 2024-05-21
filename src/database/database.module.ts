import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './schema/user.entity';
import { DatabaseConfig } from './interfaces/database.interfaces';
import dbConfig from './config/database.config'
import { Columns } from './schema/column.entity';
import { Cards } from './schema/card.entity';
import { Comments } from './schema/comment.entity';


  @Module({
    imports: [
      TypeOrmModule.forRootAsync({
        useFactory: async () => (dbConfig),
      }),
      TypeOrmModule.forFeature([Users, Columns, Cards, Comments]),
    ],
  })
  export class DatabaseModule {}