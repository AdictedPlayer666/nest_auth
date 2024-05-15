import { BoardColumn } from '../schemas/column.entity';

export class UserModel {
  id: number;
  name: string;
  email: string;
  columns: BoardColumn[];

  constructor(id: number, name: string, email: string, columns: BoardColumn[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.columns = columns;
  }
}