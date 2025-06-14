import { IsArray, IsString } from 'class-validator';

export class SetModeratorsRequest {
  @IsArray()
  @IsString({ each: true })
  moderatorIds: string[];
}