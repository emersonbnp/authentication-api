import { UserRequest } from '../dtos/user.request';
import { User, UserDocument } from '../schema/user';
import { Model } from 'mongoose';

export interface IUserRepository {
  findUser(user: User): Promise<User>
}

export const IUserRepository = Symbol('IUserRepository');