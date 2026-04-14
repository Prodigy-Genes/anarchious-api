import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDistrictDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  securityLevel?: string;
}
