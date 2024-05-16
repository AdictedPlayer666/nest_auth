import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';


@Entity('users')
export class Users {
  @PrimaryGeneratedColumn("uuid")
  user_id: uuidv4; 

  @Column("varchar")
  username: string;

  @Column("varchar")
  password: string;
}