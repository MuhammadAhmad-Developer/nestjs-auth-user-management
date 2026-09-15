import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class AskQuestionDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsOptional()
  context?: string;
}