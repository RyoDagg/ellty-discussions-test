import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Discussion' })
  discussionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, default: null, ref: 'Message' })
  parentId: Types.ObjectId | null;

  @Prop({ required: true })
  operation: '+' | '-' | '*' | '/';

  @Prop({ required: true })
  operand: number;

  @Prop({ required: true })
  result: number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
