import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PeriodicTableService } from './periodic-table.service';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../role/roles.guard';
import { Roles } from '../role/roles.decorator';
import { UserRole } from 'src/users/entity/user.entity';


@Controller('elements')
export class PeriodicTableController {
  constructor(private readonly service: PeriodicTableService) {}

  // CREATE
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(
    FileFieldsInterceptor([
  { name: 'file1', maxCount: 1 },
  { name: 'file2', maxCount: 1 },
  ])
  )
  create(@UploadedFiles() files, @Body() dto: CreateElementDto) {
    return this.service.create(dto, files);
  }

  // GET ALL
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
findOne(@Param('id') id: string) {
  return this.service.findOne(id);
}

@Patch(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
update(
  @Param('id') id: string,
  @UploadedFiles() files,
  @Body() dto,
) {
  return this.service.update(id, dto, files);
}

@Delete(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
remove(@Param('id') id: string) {
  return this.service.remove(id);
}

}