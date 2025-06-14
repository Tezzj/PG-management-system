import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyRequest } from './create-property.request';

export class UpdatePropertyRequest extends PartialType(CreatePropertyRequest) {}