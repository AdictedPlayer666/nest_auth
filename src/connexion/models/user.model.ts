import { BoardColumn } from '../schemas/column.entity';

export class UserModel {
  id: number;
  name: string;
  password: string;
  columns: BoardColumn[];

  constructor(id: number, name: string, password: string, columns: BoardColumn[]) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.columns = columns;
  }
}