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
  if (!files?.molecularFile) {
    throw new BadRequestException('Molecular file is required');
  }

  const element = new this.elementModel({
    ...dto,
    molecularFile: files.molecularFile[0].filename,
    physicalFile: files.physicalFile?.[0]?.filename,
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
    return this.elementModel.findByIdAndUpdate(
      id,
      {
        ...dto,
        ...(files.molecularFile && {
          molecularFile: files.molecularFile[0].filename,
        }),
        ...(files.physicalFile && {
          physicalFile: files.physicalFile[0].filename,
        }),
      },
      { new: true },
    );
  }

  remove(id: string) {
    return this.elementModel.findByIdAndDelete(id);
  }
}