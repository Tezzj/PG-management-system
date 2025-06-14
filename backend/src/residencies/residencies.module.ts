import { Module } from '@nestjs/common';
import { ResidenciesService } from './residencies.service';
import { ResidenciesController } from './residencies.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ResidenciesService],
  controllers: [ResidenciesController]
})
export class ResidenciesModule {}
