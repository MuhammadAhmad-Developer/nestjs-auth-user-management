import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './schemas/chat.schema';
import { GeminiProvider } from './providers/gemini.provider';

@Injectable()
export class ChatbotService {

  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    private geminiProvider: GeminiProvider,
  ) {}

  async askQuestion(userId: string, message: string) {

    const conversationId = Date.now().toString();

    // 1. STORE ONLY USER QUESTION
    await this.chatModel.create({
      userId,
      message,
      conversationId,
    });

    // 2. CALL GEMINI
    const answer = await this.geminiProvider.generateResponse(message);

    // 3. RETURN RESPONSE ONLY
    return {
      conversationId,
      question: message,
      answer,
    };
  }
}