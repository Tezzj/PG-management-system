import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomRequest } from './dto/create-room.request';
import { UpdateRoomRequest } from './dto/update-room.request';

@Injectable()
export class RoomsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRoom(propertyId: string, data: CreateRoomRequest) {
    return this.prismaService.room.create({
      data: {
        ...data,
        propertyId,
      },
    });
  }

  async getRooms(propertyId: string) {
    return this.prismaService.room.findMany({
      where: { propertyId },
    });
  }

  async getRoom(propertyId: string, roomId: string) {
    const room = await this.prismaService.room.findUnique({
      where: { id: roomId },
    });
    if (room?.propertyId !== propertyId) {
      throw new NotFoundException('Room not found in this property');
    }
    return room;
  }

  async updateRoom(propertyId: string, roomId: string, data: UpdateRoomRequest) {
    const room = await this.prismaService.room.findUnique({
      where: { id: roomId },
    });
    if (room?.propertyId !== propertyId) {
      throw new NotFoundException('Room not found in this property');
    }
    return this.prismaService.room.update({
      where: { id: roomId },
      data,
    });
  }

  async deleteRoom(propertyId: string, roomId: string) {
    const room = await this.prismaService.room.findUnique({
      where: { id: roomId },
    });
    if (room?.propertyId !== propertyId) {
      throw new NotFoundException('Room not found in this property');
    }
    return this.prismaService.room.delete({
      where: { id: roomId },
    });
  }
}