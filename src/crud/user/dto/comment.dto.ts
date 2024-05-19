import { IsString, IsNotEmpty, Length, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';


export class CommnetDto {
  @ApiProperty()
  @IsUUID()
  id: uuidv4;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  column_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  card_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comment_name: string;
}