import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { AskQuestionDto } from './dto/ask-question.dto';
import { JwtAuthGuard } from '../guard/jwt.guard';

@Controller('chatbot')
export class ChatbotController {
  constructor(private chatbotService: ChatbotService) {}

  @Post('ask')
  @UseGuards(JwtAuthGuard)
  async ask(@Body() dto: AskQuestionDto, @Request() req: any) {
    const userId = req.user.userId;

    return this.chatbotService.askQuestion(
      userId,
      dto.message,
      dto.context,
    );
  }
}