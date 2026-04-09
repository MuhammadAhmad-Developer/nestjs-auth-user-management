import { Controller } from '@nestjs/common';
import { Body, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { MailService } from '../mail/mail.service';
import { BadRequestException } from '@nestjs/common';


@Controller('auth')
export class AuthController {
      constructor(private readonly authService: AuthService ) {}
     
     
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
    @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

 @Post('reset-password')
async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
  const { sid, newPassword } = resetPasswordDto;  // <-- use sid

  const tempResetSessions = MailService.getTempResetSessions();
  const rawToken = tempResetSessions.get(sid);

  if (!rawToken) throw new BadRequestException('Invalid or expired reset session');

  const result = await this.authService.resetPassword({ sid: rawToken, newPassword });

  tempResetSessions.delete(sid);
  return result;
}


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return this.authService.getProfile(req.user);
  }

}






