// dto/reply-feedback.dto.ts

import { IsNotEmpty } from 'class-validator';

export class ReplyFeedbackDto {
  @IsNotEmpty()
  reply: string;
}