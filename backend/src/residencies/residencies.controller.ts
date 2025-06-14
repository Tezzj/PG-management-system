import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ResidenciesService } from './residencies.service';
import { CreateResidencyRequest } from './dto/create-residency.request';
import { UpdateResidencyRequest } from './dto/update-residency.request';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsAuthorizedGuard } from '../auth/guards/is-authorized.guard';

@Controller('properties/:propertyId')
export class ResidenciesController {
  constructor(private readonly residenciesService: ResidenciesService) {}

  @Post('rooms/:roomId/residencies')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async createResidency(
    @Param('propertyId') propertyId: string,
    @Param('roomId') roomId: string,
    @Body() request: CreateResidencyRequest,
  ) {
    return this.residenciesService.createResidency(propertyId, roomId, request);
  }

  @Get('rooms/:roomId/residencies')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async getResidenciesForRoom(
    @Param('propertyId') propertyId: string,
    @Param('roomId') roomId: string,
  ) {
    return this.residenciesService.getResidenciesForRoom(propertyId, roomId);
  }

  @Put('residencies/:residencyId')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async updateResidency(
    @Param('propertyId') propertyId: string,
    @Param('residencyId') residencyId: string,
    @Body() request: UpdateResidencyRequest,
  ) {
    return this.residenciesService.updateResidency(propertyId, residencyId, request);
  }

  @Delete('residencies/:residencyId')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async deleteResidency(
    @Param('propertyId') propertyId: string,
    @Param('residencyId') residencyId: string,
  ) {
    return this.residenciesService.deleteResidency(propertyId, residencyId);
  }
}