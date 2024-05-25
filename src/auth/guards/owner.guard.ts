import { Injectable, ExecutionContext, UnauthorizedException, CanActivate, ForbiddenException } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import jwt_key from '../../config/jwt_key'
import { JwtAuthService } from 'src/auth/services/auth.service';
import { UUID } from 'crypto';
import { JwtService } from "@nestjs/jwt";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class OwnerGuard implements CanActivate {

  constructor(
    
    private readonly JwtAuthService: JwtAuthService,
    private readonly jwtService: JwtService,

  ) { }

  
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const secretKey = jwt_key().secretKey;

    try {
      const user_id: uuidv4 = request.params.id;
      if (!request.headers.authorization) {
        throw new UnauthorizedException('Authorization header is missing');
      }

      const authHeaderParts = request.headers.authorization.split(' ');

      if (authHeaderParts.length !== 2 || authHeaderParts[0] !== 'Bearer') {
        throw new UnauthorizedException('Invalid authorization header format');
      }

      const token: string = authHeaderParts[1];
      const decoded = this.jwtService.verify(token, { secret: secretKey });
      const isValid = await this.JwtAuthService.validateUser2(decoded.username, user_id);
      
      if (isValid) {
        return true;
      }
      throw new ForbiddenException("Premission denied");

    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}