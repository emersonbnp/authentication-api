import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Location } from './location';

export type UserDocument = User & Document;

@Schema({ autoIndex: true })
export class User {
  public constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
  readonly _id: Types.ObjectId;
  @Prop({ unique: true })
  readonly userUuid: string;
  @Prop({ required: true, unique: true })
  readonly email: string;
  @Prop({ required: true })
  readonly password: string;
  @Prop()
  readonly type: string = 'user';
  @Prop({ required: true, type: Location })
  readonly location: Location;
}

export const UserSchema = SchemaFactory.createForClass(User);
