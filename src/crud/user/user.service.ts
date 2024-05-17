import { Injectable } from '@nestjs/common';
import { Users } from '../../database/schema/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {}
