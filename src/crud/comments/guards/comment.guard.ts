import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import jwt_key from '../../../config/jwt_key'

@Injectable()
export class CommentCreateGuard extends NestAuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.auth_headers ? request.headers.auth_headers.split(' ')[1] : null;
    if (token) {
   
    } else {
        throw new UnauthorizedException("Un");
    }
    try {
      const decoded = await jwt.verify(token, jwt_key().secretKey); 
      request.user = decoded; 

      return true;
    } catch (err) {
        throw new UnauthorizedException("Un");;
    }
  }
}