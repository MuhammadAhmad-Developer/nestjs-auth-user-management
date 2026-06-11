import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Element, ElementDocument } from './schemas/element.schema';

@Injectable()
export class PeriodicTableService {
  constructor(
    @InjectModel(Element.name)
    private elementModel: Model<ElementDocument>,
  ) {}

  async create(dto, files) {
  if (!files?.file1?.length) {
    throw new BadRequestException('file1 is required');
  }

  if (typeof dto.properties === 'string') {
    dto.properties = JSON.parse(dto.properties);
  }


  const element = new this.elementModel({
    ...dto,
    file1: files.file1[0].path,
    file2: files.file2?.[0]?.path,
  });

  return element.save();
}

  findAll() {
    return this.elementModel.find();
  }

  async findOne(id: string) {
    const element = await this.elementModel.findById(id);
    if (!element) throw new NotFoundException();
    return element;
  }

  async update(id: string, dto, files) {

  if (typeof dto.properties === 'string') {
    dto.properties = JSON.parse(dto.properties);
  }

  return this.elementModel.findByIdAndUpdate(
    id,
    {
      ...dto,

      ...(files?.file1 && {
        file1: files.file1[0].path,
      }),

      ...(files?.file2 && {
        file2: files.file2[0].path,
      }),
    },
    { returnDocument: 'after' },
  );
}

  remove(id: string) {
    return this.elementModel.findByIdAndDelete(id);
  }
}