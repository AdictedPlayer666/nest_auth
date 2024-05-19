import { IsString, IsNotEmpty, Length, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';


export class IdDto {
  @ApiProperty()
  @IsUUID()
  id: uuidv4;
  
}