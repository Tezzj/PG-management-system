import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MaintenanceStatus } from '@prisma/client';

export class CreateMaintenanceRequestRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(MaintenanceStatus)
  @IsOptional()
  status?: MaintenanceStatus;

  @IsString()
  @IsOptional()
  roomId?: string;
}