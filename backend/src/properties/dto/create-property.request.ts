import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { PropertyType } from '@prisma/client';

export class CreatePropertyRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  pincode: string;

  @IsInt()
  @Min(0)
  totalRooms: number;
}