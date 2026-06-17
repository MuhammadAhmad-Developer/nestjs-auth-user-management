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
//import { RolesGuard } from '../guard/roles.guard';
//import { UseGuards as UseGuardsDecorator } from '@nestjs/common';

@Controller('chatbot')
export class ChatbotController {

  constructor(private chatbotService: ChatbotService) {}

 /*
  @Post('ask')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async ask(
    @Body() dto: AskQuestionDto,
    @Request() req: any,
  ) {

    const userId = req.user.userId; // 👈 FROM YOUR JWT STRATEGY

    return this.chatbotService.askQuestion(userId, dto.message);
  }
*/ 
 
@Post('ask')
@UseGuards(JwtAuthGuard)
async ask(
  @Body() dto: AskQuestionDto,
  @Request() req: any,
) {
  const userId = req.user.userId;

  return this.chatbotService.askQuestion(
    userId,
    dto.message,
  );
}
  }