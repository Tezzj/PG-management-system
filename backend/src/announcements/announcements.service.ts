import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnnouncementRequest } from './dto/create-announcement.request';
import { UpdateAnnouncementRequest } from './dto/update-announcement.request';

@Injectable()
export class AnnouncementsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAnnouncement(propertyId: string, createdById: string, data: CreateAnnouncementRequest) {
    return this.prismaService.announcement.create({
      data: {
        ...data,
        propertyId,
        createdById,
      },
    });
  }

  async getAnnouncements(propertyId: string) {
    return this.prismaService.announcement.findMany({
      where: { propertyId },
    });
  }

  async getAnnouncement(propertyId: string, announcementId: string) {
    const announcement = await this.prismaService.announcement.findUnique({
      where: { id: announcementId },
    });
    if (!announcement || announcement.propertyId !== propertyId) {
      throw new NotFoundException('Announcement not found in this property');
    }
    return announcement;
  }

  async updateAnnouncement(propertyId: string, announcementId: string, data: UpdateAnnouncementRequest) {
    const announcement = await this.prismaService.announcement.findUnique({
      where: { id: announcementId },
    });
    if (!announcement || announcement.propertyId !== propertyId) {
      throw new NotFoundException('Announcement not found in this property');
    }
    return this.prismaService.announcement.update({
      where: { id: announcementId },
      data,
    });
  }

  async deleteAnnouncement(propertyId: string, announcementId: string) {
    const announcement = await this.prismaService.announcement.findUnique({
      where: { id: announcementId },
    });
    if (!announcement || announcement.propertyId !== propertyId) {
      throw new NotFoundException('Announcement not found in this property');
    }
    return this.prismaService.announcement.delete({
      where: { id: announcementId },
    });
  }
}