import { Entity, Column as TypeOrmColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users} from './user.entity';
import { Columns } from './column.entity';
@Entity('cards')
export class Cards {
  @PrimaryGeneratedColumn('uuid')
  card_id: string;

  @TypeOrmColumn('uuid')
  user_id: string;

  @TypeOrmColumn('uuid')
  column_id: string;

  @TypeOrmColumn()
  card_name: string;

  @TypeOrmColumn()
  description: string;
  
  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Columns)
  @JoinColumn({ name: 'column_id' })
  column: Columns;
}