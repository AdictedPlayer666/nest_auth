import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';


@Entity('users')
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: uuidv4; // This should be string instead of uuidv4

  @Column("varchar")
  username: string;

  @Column("varchar")
  password: string;
}