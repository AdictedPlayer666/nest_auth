import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BoardColumn } from './column.entity'; // Переименованный класс

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => BoardColumn, boardColumn => boardColumn.user)
  columns: BoardColumn[];
}