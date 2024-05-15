import * as mongoose from 'mongoose';
import { ColumnSchema } from './column.schema';
import { CardSchema } from './card.schema';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,

});

UserSchema.virtual('columns', {
  ref: 'Column',
  localField: '_id',
  foreignField: 'userId',
});

// column.schema.ts
ColumnSchema.virtual('cards', {
  ref: 'Card',
  localField: '_id',
  foreignField: 'columnId',
});

// card.schema.ts
CardSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'cardId',
});
