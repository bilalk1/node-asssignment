export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  creationDate: Date;
  dueDate: Date;
  assignedTo: string;
  category: string;
  status: string;
}

export interface TaskBody {
  title: string;
  description: string;
  dueDate: Date;
  assignedTo: string;
  category: string;
  status: string;
}
