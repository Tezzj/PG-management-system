import { Module } from '@nestjs/common'
import { RentPaymentsService } from './rent-payments.service'
import { RentPaymentsController } from './rent-payments.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [RentPaymentsService],
  controllers: [RentPaymentsController],
})
export class RentPaymentsModule {}