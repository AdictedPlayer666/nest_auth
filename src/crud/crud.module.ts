import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ColumnModule } from './column/column.module';
import { CardModule } from './card/card.module';
import { CommentsModule } from './comment/comments.module';

@Module({


  imports: [UserModule, ColumnModule, CardModule, CommentsModule]
})
export class CrudModule {

}
