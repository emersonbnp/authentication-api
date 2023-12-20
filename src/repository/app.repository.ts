import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user';
import { IUserRepository } from './app.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async findUser(user: User): Promise<User> {
    const foundUser = await this.userModel.find(user).exec();
    if (foundUser?.length) return foundUser[0];
    else throw new NotFoundException('Invalid username or password');
  }
}
