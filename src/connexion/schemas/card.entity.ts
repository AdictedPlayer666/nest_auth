import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BoardColumn } from './column.entity'; 
import { Comment } from './comment.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => BoardColumn, boardColumn => boardColumn.cards)
  column: BoardColumn;

  @OneToMany(() => Comment, comment => comment.card)
  comments: Comment[];
}