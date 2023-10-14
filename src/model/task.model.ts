import mongoose, { Document, Schema, Model } from "mongoose";

export interface ITaskDocument extends Document {
  id: number;
  title: string;
  description: string;
  creationDate: Date;
  dueDate: Date;
  assignedTo: string;
  category: string;
  status: string;
}

const taskSchema = new Schema<ITaskDocument>({
  id: Number,
  title: String,
  description: String,
  creationDate: Date,
  dueDate: Date,
  assignedTo: String,
  category: String,
  status: String,
});

export const TaskModel: Model<ITaskDocument> = mongoose.model(
  "Task",
  taskSchema,
);
