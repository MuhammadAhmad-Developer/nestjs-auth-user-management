// users.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto, RegisterDto, VerifyEmailDto } from './dto/auth.dto';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { Param, Put, Delete } from '@nestjs/common';
import { Roles } from '../role/roles.decorator';
import { RolesGuard } from '../role/roles.guard';
import { UserRole } from './entity/user.entity';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';

@Controller('user')
export class UsersController {
  constructor(private authService: UsersService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('verify-email')
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout() {
    return this.authService.logout();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req: any) {
    return this.authService.getMe(req.user);
  }

  @Get('admin/users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getAllUsers() {
    return this.authService.getAllUsers();
  }
  @Get('admin/users/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getUser(@Param('id') id: string) {
    return this.authService.getUserById(id);
  }

  @Post('admin/users/:id/login')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
loginAsUser(@Param('id') id: string) {
  return this.authService.loginAsUser(id);
}

  @Put('admin/users/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.authService.updateUser(id, body);
  }
  @Delete('admin/users/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
