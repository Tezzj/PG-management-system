import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResidencyRequest {
  @IsString()
  @IsNotEmpty()
  residentId: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;
}