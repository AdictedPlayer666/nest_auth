import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Card } from './card.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class BoardColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;


  @OneToOne(() => Card)
  cards: Card[];
}