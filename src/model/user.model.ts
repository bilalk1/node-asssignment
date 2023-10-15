import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUserDocument extends Document {
  id: number;
  name: string;
  email: string;
  password: string
}

const userSchema = new Schema<IUserDocument>({
  id: Number,
  name: String,
  email: String,
  password: String,
});

export const UserModel: Model<IUserDocument> = mongoose.model(
  'User',
  userSchema,
);
