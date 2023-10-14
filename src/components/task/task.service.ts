import { UpdateWriteOpResult } from "mongoose";
import { COMPLETED_STATUS } from "../../constants"
import { ITaskDocument, TaskModel } from "../../model/task.model";
import { TaskBody, TaskResponse } from "./task.types"

/**
 * Task service
 */
export default class TaskService {

	/**
	 * 
	 * @param taskBody
	 * @returns 
	 */
	public async createTask(
		taskBody: TaskBody
	): Promise<any> {
		taskBody.dueDate = new Date(taskBody.dueDate)
		const createdTask = await TaskModel.create(taskBody);
		return createdTask
	}

	/**
	 * 
	 * @param id 
	 * @returns 
	 */
	public async fetchTaskById(
		id: string,
	): Promise<TaskResponse> {
		return await TaskModel.findById(id)
	}

	/**
	 * 
	 * @param _id 
	 * @param taskBody 
	 * @returns 
	 */
	public async updateTask(
		_id: string,
		taskBody: TaskBody
	): Promise<UpdateWriteOpResult> {
		return await TaskModel.updateOne({ _id }, taskBody)
	}

	/**
	 * 
	 * @param _id 
	 * @returns 
	 */
	public async deleteTask(
		_id: string,
	): Promise<string> {
		await TaskModel.deleteOne({ _id })
		return "Task deleted!"
	}

	/**
	 * 
	 * @param category 
	 * @param assignedTo 
	 * @param skip 
	 * @param limit 
	 * @returns 
	 */
	public async fetchAllTasks(category: string, assignedTo: string, skip: number = 1, limit: number = 10): Promise<{ tasks: ITaskDocument[]; totalTask: number }> {
		let query = {};
		if (category) {
			query = { category }
		}
		if (assignedTo) {
			query = {
				...query,
				assignedTo
			}
		}
		const [tasks, totalTask] = await Promise.all([
			TaskModel
				.find(query)
				.skip(skip)
				.limit(limit),
			TaskModel.count(query)
		])
		return { tasks, totalTask }
	}
}
