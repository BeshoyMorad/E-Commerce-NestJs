import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserSignUpDto {
  @IsNotEmpty({ message: 'Name can not be empty' })
  @IsString({ message: 'Name should be string' })
  readonly name: string;

  @IsNotEmpty({ message: 'Email can not be empty' })
  @IsEmail({}, { message: 'Email is not valid' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password can not be empty' })
  @IsString({ message: 'Password should be string' })
  @MinLength(5, { message: 'Password should be at least 5 characters' })
  readonly password: string;
}
