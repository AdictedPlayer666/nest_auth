import { Entity, PrimaryGeneratedColumn, Column, OneToOne} from 'typeorm';
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
  @OneToOne(() => Comment)
  comments: Comment[];
}