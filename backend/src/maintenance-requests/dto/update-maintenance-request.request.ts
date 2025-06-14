import { CreateMaintenanceRequestRequest } from './create-maintenance-request.request';
import { PartialType } from '@nestjs/mapped-types'

export class UpdateMaintenanceRequestRequest extends PartialType(CreateMaintenanceRequestRequest) {}