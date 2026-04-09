import { Injectable } from '@nestjs/common';

import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';



@Injectable()
export class AuthService {
    constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async getProfile(user: any) {
    // Simply delegate to UsersService if needed
    return this.usersService.getProfile(user);
  }


  
  async register(createUserDto: CreateUserDto) {
  const email = createUserDto.email.trim().toLowerCase(); // 

  const existingUser = await this.usersService.findByEmail(email);

  if (existingUser) {
    throw new BadRequestException('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

  const user = await this.usersService.create({
    ...createUserDto,
    email: email, //  clean email
    password: hashedPassword,
    role: createUserDto.role
  });

  return {
    message: 'User registered successfully',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
}




  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: user._id.toString(),
      email: user.email,
       role: user.role,
    };

    return {
      message: 'Login successful',
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
              },
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
  const email = forgotPasswordDto.email.trim().toLowerCase();

  console.log('INPUT EMAIL:', email);

  const user = await this.usersService.findByEmail(email);
  console.log('USER FOUND:', user);
  if (!user) {
    // Security: do not reveal if email exists
    return { message: 'If this email exists, a reset link has been sent' };
  }

  // Generate raw token
  const rawToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

  user.resetToken = hashedToken;
  user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  // Save token in DB with logging
  try {
    await this.usersService.save(user);
    console.log('Token saved for user:', user.email, user.resetToken, user.resetTokenExpiry);
  } catch (err) {
    console.error('Error saving reset token:', err);
    throw new BadRequestException('Failed to generate reset token');
  }

  // Create reset link
  //const resetLink = `${this.configService.get('APP_URL')}/reset-password.html?token=${rawToken}`;
  const resetLink = `${this.configService.get('FRONTEND_URL')}/reset-password.html?sid=${rawToken}`;
 
  console.log('Reset link:', resetLink);

  // Send email
  try {
    await this.mailService.sendResetEmailWithSID(user.email, rawToken);
    console.log('Reset email sent to:', user.email);
  } catch (err) {
    console.error('Failed to send reset email:', err);
    throw new BadRequestException('Failed to send reset link');
  }

  return { message: 'Reset link sent successfully', email: user.email };
}
  

async resetPassword(resetPasswordDto: ResetPasswordDto) {
  const { sid, newPassword } = resetPasswordDto;

  // Hash the SID from URL
  const hashedToken = crypto.createHash('sha256').update(sid).digest('hex');

  // Find user in DB
  const user = await this.usersService.findByResetToken(hashedToken);

  if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
    throw new BadRequestException('Invalid or expired reset session');
  }

  // Update password
  user.password = await bcrypt.hash(newPassword, 10);

  // Clear reset token
  user.resetToken = null;
  user.resetTokenExpiry = null;

  await this.usersService.save(user);

  return { message: 'Password reset successful ' };
}

 
}

















