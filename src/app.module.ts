import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CrudModule } from './crud/crud.module';


@Module({
  
  controllers: [AppController],
  providers: [AppService],
  imports: [
    AuthModule,
    CrudModule,
  ],
})
export class AppModule {}
