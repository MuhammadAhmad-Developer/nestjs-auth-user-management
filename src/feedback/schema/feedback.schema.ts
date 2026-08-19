import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FeedbackDocument = HydratedDocument<Feedback>;

export enum FeedbackStatus {
  ACTIVE = 'ACTIVE',
  REVIEWING = 'REVIEWING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
}

@Schema({ timestamps: true })
export class Feedback {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({ enum: FeedbackStatus, default: FeedbackStatus.ACTIVE })
  status: FeedbackStatus;

  @Prop()
  adminReply: string;

  @Prop({ default: false })
  isNotified: boolean;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);