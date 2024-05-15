import * as mongoose from 'mongoose';

export const ColumnSchema = new mongoose.Schema({
  title: String,

});

ColumnSchema.virtual('cards', {
  ref: 'Card',
  localField: '_id',
  foreignField: 'columnId',
});