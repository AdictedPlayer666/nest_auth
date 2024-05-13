import { Controller, Post, Body, UsePipes, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { JwtAuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { BadRequestException } from '@nestjs/common';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: JwtAuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() authDto: AuthDto) {
   
    const isValidUser = await this.authService.validateUser(authDto.username, authDto.password);
    
   
    if (isValidUser) {
      const token = await this.authService.signPayload({ username: authDto.username });
      return { token };
    }

   
    throw new UnauthorizedException('Invalid credentials');
  }
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() userDto: AuthDto) 
  {
      const userExists = await this.authService.validateUser(userDto.username, userDto.password);
  
      if (userExists) {
        throw new BadRequestException('User already exists');
      }

      const newUser = await this.authService.createUser(userDto); 
      if(newUser)
        {
          const token = await this.authService.signPayload({ username: userDto.username });
          return { token };
        }
    }
}