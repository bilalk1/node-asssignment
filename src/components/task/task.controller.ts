import { NextFunction, Request, Router, Response } from 'express';

import BaseApi from '../BaseApi';
import TaskService from './task.service';
import { TaskBody, TaskResponse } from './task.types';
import { paginate } from '../../helpers';

/**
 * Task controller
 */
export default class TaskController extends BaseApi {
	private taskService: TaskService
	constructor(
	) {
		super();
		this.taskService = new TaskService()
	}
	public register(): Router {
		this.router.post('/task', this.postTask.bind(this));
		this.router.get('/task/:id', this.getTaskById.bind(this));
		this.router.put('/task/:id', this.putTask.bind(this));
		this.router.delete('/task/:id', this.deleteTask.bind(this));
		this.router.get('/tasks', this.getTasks.bind(this));
		return this.router;
	}

	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	public async postTask(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {

		try {
			const { body }: { body: TaskBody } = req;
			const taskResponse = await this.taskService.createTask(body)
			res.locals.data = taskResponse
			super.send(res);
		} catch (err) {
			next(err);
		}
	}

	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	public async getTaskById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const id: string = req.params.id;
			let taskResponse = await this.taskService.fetchTaskById(id)
			res.locals.data = taskResponse
			super.send(res);
		} catch (err) {
			next(err);
		}
	}

	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	public async putTask(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const id: string = req.params.id;
			const { body }: { body: TaskBody } = req;
			let taskResponse: TaskResponse = await this.taskService.updateTask(id, body)
			res.locals.data = taskResponse
			super.send(res);
		} catch (err) {
			next(err);
		}
	}

	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	public async deleteTask(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const id: string = req.params.id;
			let taskResponse: string = await this.taskService.deleteTask(id)
			res.locals.data = taskResponse
			super.send(res);
		} catch (err) {
			next(err);
		}
	}

	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	public async getTasks(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { assignedTo, category, page, pageSize }: any = req.query;
			const { skip, limit } = paginate({ page, pageSize })
			let taskResponse: Array<TaskResponse> = await this.taskService.fetchAllTasks(assignedTo, category, skip, limit)
			res.locals.data = taskResponse
			super.send(res);
		} catch (err) {
			next(err);
		}
	}

}
