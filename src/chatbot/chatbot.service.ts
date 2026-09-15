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

  async askQuestion(userId: string, message: string, context?: string) {
    const conversationId = Date.now().toString();

    // 1. STORE ONLY USER QUESTION (context not persisted — frontend already owns it)
    await this.chatModel.create({
      userId,
      message,
      conversationId,
    });

    // 2. CALL GEMINI (context passed along, just not saved)
    const answer = await this.geminiProvider.generateResponse(message, context);

    // 3. RETURN STRUCTURED RESPONSE
    return {
      conversationId,
      question: message,
      context: context ?? null,
      answer,
    };
  }
}