import { IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class UpdateResidencyRequest {
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}