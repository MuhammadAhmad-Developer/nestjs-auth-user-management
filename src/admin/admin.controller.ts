import { Controller, Get, Delete, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Patch('user/:id')
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.usersService.updateUser(id, body);
  }
}
