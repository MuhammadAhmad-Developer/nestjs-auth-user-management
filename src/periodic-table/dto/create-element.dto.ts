import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateElementDto {
  @IsString()
  name: string;

  @IsString()
  symbol: string;

  @Type(() => Number)
@IsNumber()
atomicNumber: number;

@Type(() => Number)
@IsNumber()
massNumber: number;

  @IsOptional()
  @IsString()
  description?: string;
}