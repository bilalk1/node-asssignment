import { NextFunction, Request, Router, Response } from "express";

import BaseApi from "../BaseApi";
import UserService from "./user.service";

/**
 * User controller
 */
export default class UserController extends BaseApi {
  private userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
  }
  public register(): Router {
    this.router.post("/", this.postUser.bind(this));
    return this.router;
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public async postUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { body: { name, password, email } } = req;
      const userResponse = await this.userService.createUser(name,email,password);
      res.locals.data = userResponse;
      super.send(res);
    } catch (err) {
      next(err);
    }
  }

}
