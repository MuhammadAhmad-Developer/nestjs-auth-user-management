import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { AIProvider } from './providers/ai.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema }
    ])
  ],
  controllers: [ChatbotController],
  providers: [ChatbotService, AIProvider],
})
export class ChatbotModule {}