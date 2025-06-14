import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { RoomStatus } from '@prisma/client';

export class CreateRoomRequest {
  @IsString()
  @IsNotEmpty()
  number: string;

  @IsInt()
  @Min(0)
  floor: number;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsEnum(RoomStatus)
  status: RoomStatus;

  @IsNumber()
  @Min(0)
  rentAmount: number;
}