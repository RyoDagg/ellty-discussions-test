import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Discussion } from 'src/schemas/discussion.schema';
import { Message } from 'src/schemas/message.schema';

@Injectable()
export class DiscussionsService {
  constructor(
    @InjectModel(Discussion.name)
    private discussionModel: Model<Discussion>,

    @InjectModel(Message.name)
    private messageModel: Model<Message>,
  ) {}

  async create(start: number) {
    return this.discussionModel.create({ start });
  }

  async findAll() {
    return this.discussionModel.find().sort({ createdAt: -1 }).lean();
  }

  async getTree(discussionId: string) {
    console.log('discussionId', discussionId);
    const messages = await this.messageModel
      .find({ discussionId: new Types.ObjectId(discussionId) })
      .sort({ createdAt: 1 })
      .lean();
    return messages;
  }
}
