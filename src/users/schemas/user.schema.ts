import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {

  @Prop({ enum: ['user', 'admin'], default: 'user' })
  role: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String , default: null })
resetToken: string | null;

  @Prop({ type: Date, default: null })
  resetTokenExpiry: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
