import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsOptional()
 @IsIn(['user', 'admin'])
 role?: string;
}







