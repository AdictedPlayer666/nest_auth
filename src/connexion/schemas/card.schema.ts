import * as mongoose from 'mongoose';

export const CardSchema = new mongoose.Schema({
  title: String,
  description: String,
 
});

CardSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'cardId',
});