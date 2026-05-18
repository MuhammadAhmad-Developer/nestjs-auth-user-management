import { IsString } from 'class-validator';

export class PropertyDto {
  @IsString()
  key: string;

  value: any;
}