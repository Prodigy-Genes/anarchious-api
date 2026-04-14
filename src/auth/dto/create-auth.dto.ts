import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsEmail(
    {},
    { message: 'A valid city-registered email is required for access.' },
  )
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: 'Security protocol: Password must be at least 8 characters.',
  })
  password!: string;
}
