import * as bcrypt from 'bcrypt';
import { Request } from 'express';

import { PaginationOptions } from '../types';

export const paginate = (paginationOptions: PaginationOptions) => {
  const { page, pageSize } = paginationOptions;
  // eslint-disable-next-line no-bitwise
  let skip: number = (page && parseInt(page, 10)) | 1;
    // eslint-disable-next-line no-bitwise
  const limit = (pageSize && parseInt(pageSize, 10)) | 10;
  skip = (skip - 1) * limit;
  return { skip, limit };
};

export const getIdFromRouteParams = (req: Request) => req.params?.id;

export async function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err: Error, salt: string) => {
      bcrypt.hash(password, salt, (error: Error, hash: string) => {
        resolve(hash);
      });
    });
  });
}
