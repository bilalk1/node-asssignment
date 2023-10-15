import { Router } from 'express';
import TaskController from '../components/task/task.controller';

export function privateRouter(): Router {
  const routes = Router();

  const taskController: TaskController = new TaskController();
  routes.use('/', taskController.register(), );
  return routes;
}