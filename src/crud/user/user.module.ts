import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../database/schema/user.entity'; 
import { DatabaseModule } from 'src/database/database.module';
import { Columns } from 'src/database/schema/column.entity';

@Module({
  controllers: [UserController],
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Users, Columns]),
  ],
  providers: [UserService]
})
export class UserModule {}
