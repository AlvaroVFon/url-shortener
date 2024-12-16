import { Schema, model, Document } from 'mongoose';
import UrlModel from '../interfaces/url.interface';

const urlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<UrlModel & Document>('Url', urlSchema);
