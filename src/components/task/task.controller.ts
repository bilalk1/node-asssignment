import { NextFunction, Request, Router, Response } from 'express';

import BaseApi from '../BaseApi';
import TaskService from './task.service';
import { TaskBody, TaskResponse } from './task.types';

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
		// this.router.get('/error', this.getError.bind(this));
		return this.router;
	}

	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	public postTask(
		req: Request,
		res: Response,
		next: NextFunction,
	): void {

		try {
			const { body }: { body: TaskBody } = req;
			let taskResponse: TaskResponse = this.taskService.createTask(body)
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
	public getTaskById(
		req: Request,
		res: Response,
		next: NextFunction,
	): void {
		try {
			const id: number = parseInt(req.params.id);
			let taskResponse: TaskResponse = this.taskService.fetchTaskById(id)
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
	public putTask(
		req: Request,
		res: Response,
		next: NextFunction,
	): void {
		try {
			const id: number = parseInt(req.params.id);
			const { body }: { body: TaskBody } = req;
			let taskResponse: TaskResponse = this.taskService.updateTask(id, body)
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
	public deleteTask(
		req: Request,
		res: Response,
		next: NextFunction,
	): void {
		try {
			const id: number = parseInt(req.params.id);
			let taskResponse: string = this.taskService.deleteTask(id)
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
	public getTasks(
		req: Request,
		res: Response,
		next: NextFunction,
	): void {
		try {

			let taskResponse: Array<TaskResponse> = this.taskService.fetchAllTasks()
			res.locals.data = taskResponse
			super.send(res);
		} catch (err) {
			next(err);
		}
	}

}
