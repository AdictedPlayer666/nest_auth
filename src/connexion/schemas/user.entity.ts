import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { BoardColumn } from './column.entity'; 
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: uuidv4;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToOne(() => BoardColumn)
  column: BoardColumn;
}