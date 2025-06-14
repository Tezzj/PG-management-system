import { IsEmail, IsStrongPassword } from 'class-validator';
import { IsEnum, IsString, IsPhoneNumber } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsPhoneNumber(null)
  phone: string;

  @IsEnum(UserRole)
  role: UserRole;
}