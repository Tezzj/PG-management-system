import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnnouncementRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}