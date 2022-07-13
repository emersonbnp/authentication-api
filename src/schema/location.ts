import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ autoIndex: true })
export class Location {
  @Prop()
  readonly type: string = 'Point';
  @Prop({ required: true, index: '2dsphere' })
  readonly coordinates: number[];
}
