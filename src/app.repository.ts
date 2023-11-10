import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findUser(user: User): Promise<User> {
    const foundUser = await this.userModel.find(user).exec();
    if (foundUser?.length) return foundUser[0];
    else throw new BadRequestException('Invalid username or password');
  }
}
