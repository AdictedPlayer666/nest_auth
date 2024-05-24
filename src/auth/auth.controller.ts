import { Controller, Post, Body, UsePipes, ValidationPipe, UnauthorizedException} from '@nestjs/common';
import { JwtAuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/crud/user/user.service';
import { Response, response } from 'express';

@ApiTags('auth_user')
@Controller('auth')
export class AuthController { 
  constructor(
    private readonly authService: JwtAuthService,
    private readonly UserService: UserService,
  ) {}
  
  @ApiTags('login_user')
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() authDto: UserDto) {
   
    return await this.authService.signPayload(authDto);

  }

  @ApiTags('register_user')
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() userDto: UserDto) 
  {
      const newUser = await this.UserService.createUser(userDto); 
      return await this.authService.signPayload(userDto);;
  }
}