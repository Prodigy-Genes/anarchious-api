import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MinLength,
} from 'class-validator';
import { CitizenRole } from '../entities/citizen.entity';

export class CreateCitizenDto {
  @IsEmail({}, { message: 'You must provide a valid city-registered email.' })
  email!: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: 'Security protocol: Passwords must be at least 8 characters long.',
  })
  password!: string;

  @IsEnum(CitizenRole, {
    message: 'Role must be civilian, operative, or overseer.',
  })
  @IsOptional()
  role?: CitizenRole;

  @IsUUID()
  @IsOptional()
  districtId?: string; // The ID of the district they belong to
}
