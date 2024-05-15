import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('secret_keys')
export class SecretKey {

  @PrimaryGeneratedColumn("uuid")
  id: uuidv4; // This should be string instead of uuidv4

  @Column("varchar")
  jwt_token_key: string;
}