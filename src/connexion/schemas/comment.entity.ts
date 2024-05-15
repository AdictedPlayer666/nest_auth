import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { Card } from './card.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: uuidv4;

  @Column()
  text: string;
  

  card: Card;
}