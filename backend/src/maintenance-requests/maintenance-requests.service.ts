import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaintenanceRequestRequest } from './dto/create-maintenance-request.request';
import { UpdateMaintenanceRequestRequest } from './dto/update-maintenance-request.request';

@Injectable()
export class MaintenanceRequestsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMaintenanceRequest(propertyId: string, requestedById: string, data: CreateMaintenanceRequestRequest) {
    return this.prismaService.maintenanceRequest.create({
      data: {
        ...data,
        propertyId,
        requestedById,
      },
    });
  }

  async getMaintenanceRequests(propertyId: string) {
    return this.prismaService.maintenanceRequest.findMany({
      where: { propertyId },
    });
  }

  async getMaintenanceRequest(propertyId: string, requestId: string) {
    const request = await this.prismaService.maintenanceRequest.findUnique({
      where: { id: requestId },
    });
    if (!request || request.propertyId !== propertyId) {
      throw new NotFoundException('Maintenance request not found in this property');
    }
    return request;
  }

  async updateMaintenanceRequest(propertyId: string, requestId: string, data: UpdateMaintenanceRequestRequest) {
    const request = await this.prismaService.maintenanceRequest.findUnique({
      where: { id: requestId },
    });
    if (!request || request.propertyId !== propertyId) {
      throw new NotFoundException('Maintenance request not found in this property');
    }
    return this.prismaService.maintenanceRequest.update({
      where: { id: requestId },
      data,
    });
  }

  async deleteMaintenanceRequest(propertyId: string, requestId: string) {
    const request = await this.prismaService.maintenanceRequest.findUnique({
      where: { id: requestId },
    });
    if (!request || request.propertyId !== propertyId) {
      throw new NotFoundException('Maintenance request not found in this property');
    }
    return this.prismaService.maintenanceRequest.delete({
      where: { id: requestId },
    });
  }
}