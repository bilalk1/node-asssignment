import { IUserDocument } from '../../model/user.model';

export interface CreateUserResult {
  createdUser: IUserDocument;
  token: string; // Assuming token is a string
}