import { ITaskDocument, TaskModel } from "../../model/task.model";
import { TaskBody } from "./task.types";
import ApiError from "../../abstractions/ApiError";
import { StatusCodes } from "http-status-codes";
import {
  DELETE_TASK_ERROR_ID_NOT_EXISTS,
  DELETE_TASK_SUCCESS,
  GET_TASK_ERROR_ID_NOT_EXISTS,
  UPDATE_TASK_ERROR_ID_NOT_EXISTS,
  UPDATE_TASK_SUCCESS,
} from "../../messages";
import UserService from "../user/user.service";

/**
 * Task service
 */
export default class TaskService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   *
   * @param taskBody
   * @returns
   */
  public async createTask(taskBody: TaskBody): Promise<any> {
    taskBody.dueDate = new Date(taskBody.dueDate);
    const user = await this.userService.fetchUserByName(taskBody.assignedTo);
    taskBody.assignedTo = user?._id;
    const createdTask = (await TaskModel.create(taskBody)).populate(
      "assignedTo",
    );
    return createdTask;
  }

  /**
   *
   * @param id
   * @returns
   */
  public async fetchTaskById(id: string): Promise<ITaskDocument> {
    const task = await await TaskModel.findById(id).populate("assignedTo");
    if (!task)
      throw new ApiError(GET_TASK_ERROR_ID_NOT_EXISTS, StatusCodes.NOT_FOUND);
    return task;
  }

  /**
   *
   * @param _id
   * @param taskBody
   * @returns
   */
  public async updateTask(_id: string, taskBody: TaskBody): Promise<string> {
    if (taskBody.assignedTo) {
      const user = await this.userService.fetchUserByName(taskBody.assignedTo);
      taskBody.assignedTo = user?._id;
    }
    const { matchedCount } = await TaskModel.updateOne({ _id }, taskBody);
    if (!matchedCount)
      throw new ApiError(
        UPDATE_TASK_ERROR_ID_NOT_EXISTS,
        StatusCodes.NOT_FOUND,
      );
    return UPDATE_TASK_SUCCESS;
  }

  /**
   *
   * @param _id
   * @returns
   */
  public async deleteTask(_id: string): Promise<string> {
    const { deletedCount } = await TaskModel.deleteOne({ _id });
    if (!deletedCount)
      throw new ApiError(
        DELETE_TASK_ERROR_ID_NOT_EXISTS,
        StatusCodes.NOT_FOUND,
      );
    return DELETE_TASK_SUCCESS;
  }

  /**
   *
   * @param category
   * @param assignedTo
   * @param skip
   * @param limit
   * @returns
   */
  public async fetchAllTasks(
    category?: string,
    assignedTo?: string,
    skip: number = 1,
    limit: number = 10,
  ): Promise<{ tasks: ITaskDocument[]; totalTask: number }> {
    let query = {};
    if (category) {
      query = { category };
    }
    if (assignedTo) {
      query = {
        ...query,
        assignedTo,
      };
    }
    const [tasks, totalTask] = await Promise.all([
      TaskModel.find(query).populate("assignedTo").skip(skip).limit(limit),
      TaskModel.count(query),
    ]);
    return { tasks, totalTask };
  }
}
