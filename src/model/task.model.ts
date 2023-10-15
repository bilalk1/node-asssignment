import mongoose, { Document, Schema, Model, ObjectId } from 'mongoose';

export interface ITaskDocument extends Document {
  id: number;
  title: string;
  description: string;
  creationDate: Date;
  dueDate: Date;
  assignedTo: ObjectId;
  category: string;
  status: string;
}

const taskSchema = new Schema<ITaskDocument>({
  id: Number,
  title: String,
  description: String,
  creationDate: Date,
  dueDate: Date,
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  category: String,
  status: String,
},
{
  timestamps: true
}
);

export const TaskModel: Model<ITaskDocument> = mongoose.model(
  'Task',
  taskSchema,
);
