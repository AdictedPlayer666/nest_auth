import { Controller, Post, Body, UsePipes, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { JwtAuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/crud/user/user.service';

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
   
    const isValidUser = await this.UserService.validateUser(authDto);
    
   
    if (isValidUser) {
      const token = await this.authService.signPayload({ username: authDto.username });
      return { token };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  @ApiTags('register_user')
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() userDto: UserDto) 
  {
      const newUser = await this.UserService.createUser(userDto); 
      if(newUser)
        {
          const token = await this.authService.signPayload({ username: userDto.username, password: userDto.password });
          return { token };
        }
    }
}