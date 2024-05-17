import { Controller, Post, Body, UsePipes, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { JwtAuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth_user')
@Controller('auth')
export class AuthController { 
  constructor(private readonly authService: JwtAuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() authDto: UserDto) {
   
    const isValidUser = await this.authService.validateUser(authDto.username, authDto.password);
    
   
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
      const userExists = await this.authService.validateUser(userDto.username, userDto.password);
  
      if (userExists) {
        throw new BadRequestException('User already exists');
      }

      const newUser = await this.authService.createUser(userDto); 
      if(newUser)
        {
          const token = await this.authService.signPayload({ username: userDto.username, password: userDto.password });
          return { token };
        }
    }
}