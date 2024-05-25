// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtAuthService } from '../services/auth.service';
// import { UserDto } from '../dto/user.dto';
// import jwt_key from '../../config/jwt_key'

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor(private readonly authService: JwtAuthService) {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey: jwt_key().secretKey,
//         });
//     }

//     async validate(payloadto: UserDto) {
//         const user = await this.authService.validateUser(payloadto);
//         if (!user) {
//             throw new UnauthorizedException('Invalid token');
//         }
//         return user;
//     }


// }