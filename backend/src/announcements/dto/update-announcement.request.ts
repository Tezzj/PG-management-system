import { PartialType } from '@nestjs/mapped-types'
import { CreateAnnouncementRequest } from './create-announcement.request'

export class UpdateAnnouncementRequest extends PartialType(CreateAnnouncementRequest) {}