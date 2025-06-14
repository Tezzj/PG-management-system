import { PartialType } from '@nestjs/mapped-types'
import { CreateRentPaymentRequest } from './create-rent-payment.request'

export class UpdateRentPaymentRequest extends PartialType(CreateRentPaymentRequest) { }