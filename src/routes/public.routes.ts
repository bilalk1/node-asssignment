import { Router } from 'express';
import UserController from '../components/user/user.controller';

export function publicRouter(): Router {
  const router = Router();

  const userController: UserController = new UserController();
  router.use('/user', userController.register());
  return router;
}
