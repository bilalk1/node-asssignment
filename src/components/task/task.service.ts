import { COMPLETED_STATUS } from "../../constants"
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
	public createTask(
		taskBody: TaskBody
	): TaskResponse {
		// Integrate the db for state management
		return { id: 1, creationDate: new Date(), ...taskBody }
	}

	/**
	 * 
	 * @param id 
	 * @returns 
	 */
	public fetchTaskById(
		id: number,
	): TaskResponse {
		const taskBody: TaskResponse = {
			id: 1,
			title: "",
			description: "",
			creationDate: new Date(),
			dueDate: new Date(),
			assignedTo: "",
			category: "",
			status: COMPLETED_STATUS

		}

		return { id: 1, creationDate: new Date(), ...taskBody }
	}

	/**
	 * 
	 * @param id 
	 * @param taskBody 
	 * @returns 
	 */
	public updateTask(
		id: number,
		taskBody: TaskBody
	): any {
		return { id: 1, creationDate: new Date(), ...taskBody }
	}

	/**
	 * 
	 * @param id 
	 * @returns 
	 */
	public deleteTask(
		id: number,
	): string {
		return "Task deleted!"
	}

	/**
	 * 
	 * @returns 
	 */
	public fetchAllTasks(): Array<TaskResponse> {
		const taskBody: TaskResponse = {
			id: 1,
			title: "",
			description: "",
			creationDate: new Date(),
			dueDate: new Date(),
			assignedTo: "",
			category: "",
			status: COMPLETED_STATUS

		}
		return [taskBody]
	}
}
