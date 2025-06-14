import { PartialType } from '@nestjs/mapped-types'
import { CreateBillShareRequest } from './create-bill-share.request'

export class UpdateBillShareRequest extends PartialType(CreateBillShareRequest) {}