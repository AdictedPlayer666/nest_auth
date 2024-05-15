import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BoardColumn } from './column.entity'; 
import { Comment } from './comment.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: uuidv4;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => BoardColumn, boardColumn => boardColumn.cards)
  column: BoardColumn;

  @OneToMany(() => Comment, comment => comment.card)
  comments: Comment[];
}