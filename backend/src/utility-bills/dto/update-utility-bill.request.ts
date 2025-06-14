import { PartialType } from '@nestjs/mapped-types'
import { CreateUtilityBillRequest } from './create-utility-bill.request'

export class UpdateUtilityBillRequest extends PartialType(CreateUtilityBillRequest) {}