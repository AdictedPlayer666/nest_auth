import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BoardColumn } from './column.entity'; 
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: uuidv4;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => BoardColumn, boardColumn => boardColumn.user)
  columns: BoardColumn[];
}