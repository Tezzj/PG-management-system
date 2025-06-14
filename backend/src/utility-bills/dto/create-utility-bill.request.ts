import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { PaymentStatus } from '@prisma/client'

export class CreateUtilityBillRequest {
  @IsString()
  @IsNotEmpty()
  type: string

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number

  @IsDateString()
  @IsNotEmpty()
  billDate: string

  @IsDateString()
  @IsNotEmpty()
  dueDate: string

  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  status: PaymentStatus
}