import {
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateElementDto {
  @IsString()
  model_name: string;

  @IsString()
  model_annotation: string;

  @IsOptional()
  @IsString()
  content?: string;

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
    return value;
  })
  @IsArray()
  properties: any[];
}