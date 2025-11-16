import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Discussion' })
  discussionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Message', default: null })
  parentId: Types.ObjectId | null;

  @Prop({ required: true, enum: ['+', '-', '*', '/'] })
  operation: '+' | '-' | '*' | '/';

  @Prop({ required: true })
  operand: number;

  @Prop({ required: true })
  result: number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
