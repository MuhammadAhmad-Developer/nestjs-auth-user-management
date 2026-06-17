import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackModule } from './feedback/feedback.module';
import { PeriodicTableModule } from './periodic-table/periodic-table.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI ?? "mongodb://localhost:27017/reaction-simulator-DB"),
UsersModule,
FeedbackModule,
PeriodicTableModule,
ChatbotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
