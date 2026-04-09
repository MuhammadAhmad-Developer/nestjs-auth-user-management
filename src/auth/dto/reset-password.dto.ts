import { IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Token is required' })
  sid: string;

  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(6, { message: 'New password must be at least 6 characters long' })
  newPassword: string;
}




