import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message } from 'src/schemas/message.schema';
import { Discussion } from 'src/schemas/discussion.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
    @InjectModel(Discussion.name)
    private discussionModel: Model<Discussion>,
  ) {}

  async create(
    payload: {
      discussionId: string;
      parentId: string | null;
      operation: string;
      operand: number;
    },
    userId: string,
  ) {
    const { discussionId, parentId, operation, operand } = payload;

    if (!['+', '-', '*', '/'].includes(operation))
      throw new BadRequestException('Invalid operation');

    // get parent result value
    let baseValue: number;

    if (!parentId) {
      const discussion = await this.discussionModel.findById(discussionId);
      if (!discussion) {
        throw new BadRequestException('Discussion not found');
      }
      baseValue = discussion.start;
    } else {
      const parent = await this.messageModel.findById(parentId);
      if (!parent) {
        throw new BadRequestException('Parent message not found');
      }
      baseValue = parent.result;
    }

    const result = eval(`${baseValue} ${operation} ${operand}`);

    return this.messageModel.create({
      discussionId: new Types.ObjectId(discussionId),
      parentId: parentId ? new Types.ObjectId(parentId) : null,
      operation,
      operand,
      result,
      userId,
    });
  }
}
