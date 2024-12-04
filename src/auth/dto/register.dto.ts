import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsIn } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsIn(['Admin', 'User'])
  role?: string;
}
