import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecretKey } from './secret-key.entity';
import { JwtModuleOptions } from '@nestjs/jwt';
import { JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()

export class DatabaseService {
  constructor(
    @InjectRepository(SecretKey)
    private secretKeyRepository: Repository<SecretKey>,
  ) {}

async getSecretKey(): Promise<string> {
    const secretKeyEntity = await this.secretKeyRepository.findOne({
      select: ["jwt_token_key"]
    });

    if (secretKeyEntity) {
      return secretKeyEntity.jwt_token_key;
    } else {
      throw new Error("Secret key not found");
    }
  }
}