import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Type, Transform } from 'class-transformer';
import { PropertyDto } from './property.dto';

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
  @ValidateNested({ each: true })
  @Type(() => PropertyDto)
  properties: PropertyDto[];
}