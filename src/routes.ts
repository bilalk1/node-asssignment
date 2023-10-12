import { Router } from 'express';
import TaskController from './components/task/task.controller';

/**
 * Here, you can register routes by instantiating the controller.
 *
 */
export default function routes(): Router {
	const router = Router();

	const taskController: TaskController = new TaskController();
	router.use('/', taskController.register());
	return router;
}
