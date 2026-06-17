import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Chat {

  @Prop()
  userId: string;

  @Prop()
  message: string;

  @Prop()
  conversationId: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);