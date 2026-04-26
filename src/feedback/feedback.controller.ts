import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { ReplyFeedbackDto } from './dto/reply-feedback.dto';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Roles } from '../role/roles.decorator';
import { RolesGuard } from '../role/roles.guard';
import { UserRole } from '../users/entity/user.entity';



@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  // USER
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Req() req, @Body() dto: CreateFeedbackDto) {
    return this.feedbackService.create(req.user.userId, dto.message);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('my')
  getMy(@Req() req) {
    return this.feedbackService.getUserFeedback(req.user.userId);
  }

  // ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  getAll(@Query('status') status?: string, @Query('user') user?: string) {
    return this.feedbackService.getAll(status, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post(':id/review')
  review(@Param('id') id: string) {
    return this.feedbackService.markReviewing(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post(':id/reply')
  reply(@Param('id') id: string, @Body() dto: ReplyFeedbackDto) {
    return this.feedbackService.reply(id, dto.reply);
  }
}