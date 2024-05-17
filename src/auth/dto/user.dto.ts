import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  @ApiProperty()
  password: string;

}
