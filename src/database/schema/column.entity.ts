
import { Entity, Column as TypeOrmColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('columns')
export class Columns {
  @PrimaryGeneratedColumn('uuid')
  column_id: string;

  @TypeOrmColumn('uuid')
  user_id: string;

  @TypeOrmColumn()
  column_name: string;

  @TypeOrmColumn()
  description: string;
}