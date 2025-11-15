import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DiscussionDocument = HydratedDocument<Discussion>;

@Schema({ timestamps: true })
export class Discussion {
  @Prop({ required: true })
  start: number;
}

export const DiscussionSchema = SchemaFactory.createForClass(Discussion);
