import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: false })
  password?: string;

  @Prop()
  googleId?: string;

  @Prop({ default: 'local' })
  provider?: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ required: false })
  verificationToken?: string;

  @Prop({ required: false })
  verificationTokenExpiry?: Date;

  @Prop()
  lastLogin: Date;

  @Prop()
  resetPasswordToken?: string;

  @Prop()
  resetPasswordExpiry?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);