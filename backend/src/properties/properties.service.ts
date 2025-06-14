import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyRequest } from './dto/create-property.request';
import { UpdatePropertyRequest } from './dto/update-property.request';
import { SetModeratorsRequest } from '../auth/dto/set-moderators.request';

@Injectable()
export class PropertiesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProperty(data: CreatePropertyRequest, ownerId: string) {
    return this.prismaService.property.create({
      data: {
        ...data,
        ownerId,
      },
    });
  }

  async getProperties(userId: string) {
  // Return all properties owned by or accessible to the user
  // Adjust filtering logic according to your requirements
  return this.prismaService.property.findMany({
    where: {
      OR: [
        { ownerId: userId },
        { moderators: { some: { id: userId } } }, // if you want to allow moderators access
      ],
    },
    include: { moderators: true }, // optional
  });
}


  async getProperty(id: string) {
    return this.prismaService.property.findUniqueOrThrow({
      where: { id },
    });
  }

  async updateProperty(id: string, data: UpdatePropertyRequest) {
    return this.prismaService.property.update({
      where: { id },
      data,
    });
  }

  async deleteProperty(id: string) {
    return this.prismaService.property.delete({
      where: { id },
    });
  }

  async setModerators(propertyId: string, data: SetModeratorsRequest) {
    const moderators = await this.prismaService.user.findMany({
      where: { id: { in: data.moderatorIds }, role: 'MODERATOR' },
    });

    if (moderators.length !== data.moderatorIds.length) {
      throw new UnprocessableEntityException('Some users are not moderators');
    }

    return this.prismaService.property.update({
      where: { id: propertyId },
      data: {
        moderators: {
          set: data.moderatorIds.map((id) => ({ id })),
        },
      },
    });
  }
}