import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from 'src/schema/user';

export class UserRequest {
  constructor({ username, password }) {
    this.username = username;
    this.password = password;
  }
  @IsEmail('Invalid email.')
  readonly username: string;
  @IsNotEmpty()
  readonly password: string;
  toUser = () => new User({ email: this.username, password: this.password });
}
