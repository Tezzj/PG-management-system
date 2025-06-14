import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResidencyRequest } from './dto/create-residency.request';
import { UpdateResidencyRequest } from './dto/update-residency.request';

@Injectable()
export class ResidenciesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createResidency(
    propertyId: string,
    roomId: string,
    data: CreateResidencyRequest,
  ) {
    const room = await this.prismaService.room.findUnique({
      where: { id: roomId },
    });
    if (room?.propertyId !== propertyId) {
      throw new NotFoundException('Room not found in this property');
    }

    const existingResidency = await this.prismaService.residency.findFirst({
      where: { residentId: data.residentId, active: true },
    });
    if (existingResidency) {
      throw new UnprocessableEntityException(
        'User already has an active residency',
      );
    }

    return this.prismaService.residency.create({
      data: {
        ...data,
        roomId,
      },
    });
  }

  async getResidenciesForRoom(propertyId: string, roomId: string) {
    const room = await this.prismaService.room.findUnique({
      where: { id: roomId },
    });
    if (room?.propertyId !== propertyId) {
      throw new NotFoundException('Room not found in this property');
    }
    return this.prismaService.residency.findMany({
      where: { roomId },
    });
  }

  async updateResidency(
    propertyId: string,
    residencyId: string,
    data: UpdateResidencyRequest,
  ) {
    const residency = await this.prismaService.residency.findUnique({
      where: { id: residencyId },
      include: { room: { select: { propertyId: true } } },
    });
    if (!residency || residency.room.propertyId !== propertyId) {
      throw new NotFoundException('Residency not found in this property');
    }
    return this.prismaService.residency.update({
      where: { id: residencyId },
      data,
    });
  }

  async deleteResidency(propertyId: string, residencyId: string) {
    const residency = await this.prismaService.residency.findUnique({
      where: { id: residencyId },
      include: { room: { select: { propertyId: true } } },
    });
    if (!residency || residency.room.propertyId !== propertyId) {
      throw new NotFoundException('Residency not found in this property');
    }
    return this.prismaService.residency.delete({
      where: { id: residencyId },
    });
  }
}