import { Controller, Post, Body, Param, Get, Put, Delete, UseGuards } from '@nestjs/common';
import { MaintenanceRequestsService } from './maintenance-requests.service';
import { CreateMaintenanceRequestRequest } from './dto/create-maintenance-request.request';
import { UpdateMaintenanceRequestRequest } from './dto/update-maintenance-request.request';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IsAuthorizedGuard } from '../auth/guards/is-authorized.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('properties/:propertyId/maintenance-requests')
export class MaintenanceRequestsController {
  constructor(private readonly maintenanceRequestsService: MaintenanceRequestsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.GUEST, UserRole.MODERATOR, UserRole.OWNER)
  async createMaintenanceRequest(
    @Param('propertyId') propertyId: string,
    @CurrentUser() user: TokenPayload,
    @Body() request: CreateMaintenanceRequestRequest,
  ) {
    return this.maintenanceRequestsService.createMaintenanceRequest(propertyId, user.userId, request);
  }

  @Get()
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async getMaintenanceRequests(@Param('propertyId') propertyId: string) {
    return this.maintenanceRequestsService.getMaintenanceRequests(propertyId);
  }

  @Get(':requestId')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async getMaintenanceRequest(@Param('propertyId') propertyId: string, @Param('requestId') requestId: string) {
    return this.maintenanceRequestsService.getMaintenanceRequest(propertyId, requestId);
  }

  @Put(':requestId')
  @UseGuards(JwtAuthGuard, RolesGuard, IsAuthorizedGuard)
  @Roles(UserRole.OWNER, UserRole.MODERATOR)
  async updateMaintenanceRequest(
    @Param('propertyId') propertyId: string,
    @Param('requestId') requestId: string,
    @Body() request: UpdateMaintenanceRequestRequest,
  ) {
    return this.maintenanceRequestsService.updateMaintenanceRequest(propertyId, requestId, request);
  }

  @Delete(':requestId')
  @UseGuards(JwtAuthGuard, RolesGuard, IsAuthorizedGuard)
  @Roles(UserRole.OWNER, UserRole.MODERATOR)
  async deleteMaintenanceRequest(@Param('propertyId') propertyId: string, @Param('requestId') requestId: string) {
    return this.maintenanceRequestsService.deleteMaintenanceRequest(propertyId, requestId);
  }
}