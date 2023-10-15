import { NextFunction, Request, Router, Response } from "express";

import { getIdFromRouteParams, paginate } from "../../helpers";
import BaseApi from "../BaseApi";
import TaskService from "./task.service";
import { TaskBody } from "./task.types";

/**
 * Task controller
 */
export default class TaskController extends BaseApi {
  private taskService: TaskService;

  constructor() {
    super();
    this.taskService = new TaskService();
  }

  public register(): Router {
    this.router.post("/task", this.postTask.bind(this));
    this.router.get("/task/:id", this.getTaskById.bind(this));
    this.router.put("/task/:id", this.putTask.bind(this));
    this.router.delete("/task/:id", this.deleteTask.bind(this));
    this.router.get("/tasks", this.getTasks.bind(this));
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
    next: NextFunction
  ): Promise<void> {
    try {
      const { body }: { body: TaskBody } = req;
      const taskResponse = await this.taskService.createTask(body);
      res.locals.data = taskResponse;
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
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = getIdFromRouteParams(req);
      const taskResponse = await this.taskService.fetchTaskById(id);
      res.locals.data = taskResponse;
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
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = getIdFromRouteParams(req);
      const { body }: { body: TaskBody } = req;
      const taskResponse = await this.taskService.updateTask(id, body);
      res.locals.data = taskResponse;
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
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = getIdFromRouteParams(req);
      const taskResponse: string = await this.taskService.deleteTask(id);
      res.locals.data = taskResponse;
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
    next: NextFunction
  ): Promise<void> {
    try {
      const { assignedTo, category, page, pageSize } = req.query as {
        [key: string]: string;
      };
      const { skip, limit } = paginate({ page, pageSize });
      const taskResponse = await this.taskService.fetchAllTasks(
        category,
        assignedTo,
        skip,
        limit
      );
      res.locals.data = taskResponse;
      super.send(res);
    } catch (err) {
      next(err);
    }
  }
}
