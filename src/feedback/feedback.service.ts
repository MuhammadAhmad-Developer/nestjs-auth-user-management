import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Feedback, FeedbackDocument, FeedbackStatus } from './schema/feedback.schema';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name)
    private feedbackModel: Model<FeedbackDocument>,
  ) {}

  // USER: create
  async create(userId: string, message: string) {
    return this.feedbackModel.create({
      user: userId,
      message,
      status: FeedbackStatus.ACTIVE,
    });
  }

  // USER: get own
  async getUserFeedback(userId: string) {
    return this.feedbackModel.find({ user: userId });
  }

  // ADMIN: get all + filter
  async getAll(status?: string, user?: string) {
    const filter: any = {};

    if (status) filter.status = status;

    if (user && Types.ObjectId.isValid(user)) {
      filter.user = new Types.ObjectId(user);
    }

    return this.feedbackModel
      .find(filter)
      .sort({ createdAt: -1 })
      .populate('user', 'name email');
  }

  // ADMIN: mark reviewing
  async markReviewing(id: string) {
    const fb = await this.feedbackModel.findById(id);
    if (!fb) throw new NotFoundException('Feedback not found');

    if (fb.status !== FeedbackStatus.ACTIVE) {
      throw new BadRequestException('Only ACTIVE feedback can be reviewed');
    }

    fb.status = FeedbackStatus.REVIEWING;
    return fb.save();
  }

  // ADMIN: reply
  async reply(id: string, reply: string) {
    const fb = await this.feedbackModel.findById(id);
    if (!fb) throw new NotFoundException('Feedback not found');

    if (fb.status === FeedbackStatus.COMPLETED) {
      throw new BadRequestException('Already completed');
    }

    fb.adminReply = reply;
    fb.status = FeedbackStatus.COMPLETED;
    fb.isNotified = true;

    return fb.save();
  }
}