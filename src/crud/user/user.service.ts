import { Injectable } from '@nestjs/common';
import { Users } from '../../database/schema/user.entity'; // Исправленный путь импорта
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) // Исправлено Users на User
    private readonly userRepository: Repository<Users>
  ) {}

  // Добавьте остальные методы и логику сервиса здесь
}