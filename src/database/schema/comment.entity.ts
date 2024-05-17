import { Entity, Column as TypeOrmColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Users } from './user.entity';
import { Columns } from './column.entity';
import { Cards } from './card.entity';

@Entity('comments')
export class Comments {
  @PrimaryGeneratedColumn('uuid')
  comment_id: string;

  @TypeOrmColumn('uuid')
  user_id: string;

  @TypeOrmColumn('uuid')
  column_id: string;

  @TypeOrmColumn('uuid')
  card_id: string;

  @TypeOrmColumn()
  comment_name: string;

  @TypeOrmColumn()
  description: string;
  
  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Columns)
  @JoinColumn({ name: 'column_id' })
  column: Columns;

  @ManyToOne(() => Cards)
  @JoinColumn({ name: 'card_id' })
  card: Cards;
}