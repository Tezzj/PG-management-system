import { Module } from '@nestjs/common'
import { UtilityBillsService } from './utility-bills.service'
import { UtilityBillsController } from './utility-bills.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [UtilityBillsService],
  controllers: [UtilityBillsController],
})
export class UtilityBillsModule {}