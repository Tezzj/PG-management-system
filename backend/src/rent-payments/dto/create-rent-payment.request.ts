import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator'
import { PaymentStatus } from '@prisma/client'

export class CreateRentPaymentRequest {
  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsDateString()
  @IsNotEmpty()
  dueDate: string

  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  status: PaymentStatus
}