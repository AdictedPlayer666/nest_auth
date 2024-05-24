import { Injectable, ExecutionContext, UnauthorizedException, CanActivate, ForbiddenException } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import jwt_key from '../../config/jwt_key'
import { JwtAuthService } from 'src/auth/services/auth.service';
import { UUID } from 'crypto';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class OwnerGuard implements CanActivate   {

  constructor(
    private readonly JwtAuthService: JwtAuthService,
    private readonly jwtService: JwtService,

  ){}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    
    const secretKey = jwt_key().secretKey;


    try { 
      const user_id: number = +request.params.id;
       if (!request.headers.authorization) {
        throw new UnauthorizedException('Authorization header is missing');
      }

      const authHeaderParts = request.headers.authorization.split(' ');

      if (authHeaderParts.length !== 2 || authHeaderParts[0] !== 'Bearer') {
        throw new UnauthorizedException('Invalid authorization header format');
      }

      const token: string = authHeaderParts[1];
      const user = this.jwtService.verify(token, {secret: secretKey});

      const isValid = await this.JwtAuthService.validateUser(user);

      if(isValid)
        {
          return true;
        }
        throw new ForbiddenException(user);
    
    } catch (err) {
        throw new UnauthorizedException(err);
    }
  }
}