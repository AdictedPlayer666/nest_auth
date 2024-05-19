import { IsString, IsNotEmpty, Length, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';


export class CommnetDto {
  @IsUUID()
  id: uuidv4;
  
  @IsString()
  @IsNotEmpty()
  column_name: string;

  @IsString()
  @IsNotEmpty()
  card_name: string;

  @IsString()
  @IsNotEmpty()
  comment_name: string;
}