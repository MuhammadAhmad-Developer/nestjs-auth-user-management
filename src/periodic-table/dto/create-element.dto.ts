import {
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateElementDto {

  @IsString()
  model_name: string;

  @IsString()
  model_annotation: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsArray()
  properties: {
    key: string;
    value: string;
  }[];
}