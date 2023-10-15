import { StatusCodes } from "http-status-codes";
import ApiError from "../../abstractions/ApiError";
import { ERROR_USER_NOT_EXISTS } from "../../messages";
import { IUserDocument, UserModel } from "../../model/user.model";
import { encryptPassword } from "../../helpers";
import JwtService from "../jwt/jwt.service";

/**
 * User service
 */
export default class UserService {
  private jwtService: JwtService;
  constructor() {
    this.jwtService = new JwtService()
  }

  /**
   *
   * @param name
   * @returns
   */
  public async createUser(name: string, email: string, password: string): Promise<any> {
    const encryptedPassword = await encryptPassword(password)
    const createdUser = await UserModel.create({
      name,
      email,
      password: encryptedPassword
    });
    delete createdUser.password;
    const token = await this.jwtService.createToken({ name, email })
    return { createdUser, token };
  }

  /**
   *
   * @param name
   * @returns
   */
  public fetchUserByName = async (name: string): Promise<IUserDocument> => {
    const user = await UserModel.findOne({ name });
    if (!user)
      throw new ApiError(
        ERROR_USER_NOT_EXISTS,
        StatusCodes.NOT_FOUND,
      );
    return user;
  }
}
