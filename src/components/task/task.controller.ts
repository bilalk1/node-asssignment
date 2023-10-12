import { NextFunction, Request, Router } from 'express';

import BaseApi from '../BaseApi';
import TaskService from './task.service';

/**
 * Status controller
 */
export default class TaskController extends BaseApi {
	private taskService: TaskService
	/**
	 *
	 */
	constructor(
	) {
		super();
		this.taskService = new TaskService()
	}

	/**
	 *
	 */
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
		res: any,
		next: NextFunction,
	): void {
		try {

			let task = this.taskService.createTask({})
			res.locals.data = task
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
		res: any,
		next: NextFunction,
	): void {
		try {

			let task = this.taskService.fetchTaskById({})
			res.locals.data = task
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
		res: any,
		next: NextFunction,
	): void {
		try {

			let task = this.taskService.updateTask({})
			res.locals.data = task
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
		res: any,
		next: NextFunction,
	): void {
		try {

			let task = this.taskService.deleteTask({})
			res.locals.data = task
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
		res: any,
		next: NextFunction,
	): void {
		try {

			let task = this.taskService.fetchAllTasks({})
			res.locals.data = task
			super.send(res);
		} catch (err) {
			next(err);
		}
	}

}
