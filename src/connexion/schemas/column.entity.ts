import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Card } from './card.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class BoardColumn {
  @PrimaryGeneratedColumn()
  id: uuidv4;

  @Column()
  title: string;

  @ManyToOne(() => User, user => user.columns)
  user: User;

  @OneToMany(() => Card, card => card.column)
  cards: Card[];
}