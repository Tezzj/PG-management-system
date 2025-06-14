import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateBillShareRequest {
  @IsString()
  @IsNotEmpty()
  userId: string

  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsBoolean()
  @IsNotEmpty()
  paid: boolean
}