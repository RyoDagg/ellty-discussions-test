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

  async create(start: number, userId: string) {
    return this.discussionModel.create({ start, userId });
  }

  async findAll() {
    return this.discussionModel.find().sort({ createdAt: -1 }).lean();
  }

  async getDiscussion(discussionId: string) {
    const discussion = await this.discussionModel
      .findById(discussionId)
      .populate({ path: 'userId', select: '-password' })
      .lean();

    if (!discussion) return null;

    const messages = await this.messageModel
      .find({ discussionId: new Types.ObjectId(discussionId) })
      .populate({ path: 'userId', select: '-password' })
      .lean();

    const buildTree = (parentId: Types.ObjectId | null = null) =>
      messages
        .filter((m) => String(m.parentId) === String(parentId))
        .map((m) => ({
          ...m,
          children: buildTree(m._id),
        }));

    return {
      ...discussion,
      messages: buildTree(),
    };
  }
}
