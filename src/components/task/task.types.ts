import { COMPLETED_STATUS, PENDING_STATUS } from "../../constants"

export interface TaskResponse {
    id: number,
    title: string,
    description: string,
    creationDate: Date,
    dueDate: Date,
    assignedTo: String,
    category: String,
    status: string
}

export interface TaskBody {
    title: string,
    description: string,
    dueDate: Date,
    assignedTo: String,
    category: String,
    status: string
}