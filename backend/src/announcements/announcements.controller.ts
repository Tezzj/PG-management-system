import { Controller, Post, Body, Param, Get, Put, Delete, UseGuards } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementRequest } from './dto/create-announcement.request';
import { UpdateAnnouncementRequest } from './dto/update-announcement.request';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IsAuthorizedGuard } from '../auth/guards/is-authorized.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('properties/:propertyId/announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, IsAuthorizedGuard)
  @Roles(UserRole.OWNER, UserRole.MODERATOR)
  async createAnnouncement(
    @Param('propertyId') propertyId: string,
    @CurrentUser() user: TokenPayload,
    @Body() request: CreateAnnouncementRequest,
  ) {
    return this.announcementsService.createAnnouncement(propertyId, user.userId, request);
  }

  @Get()
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async getAnnouncements(@Param('propertyId') propertyId: string) {
    return this.announcementsService.getAnnouncements(propertyId);
  }

  @Get(':announcementId')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async getAnnouncement(@Param('propertyId') propertyId: string, @Param('announcementId') announcementId: string) {
    return this.announcementsService.getAnnouncement(propertyId, announcementId);
  }

  @Put(':announcementId')
  @UseGuards(JwtAuthGuard, RolesGuard, IsAuthorizedGuard)
  @Roles(UserRole.OWNER, UserRole.MODERATOR)
  async updateAnnouncement(
    @Param('propertyId') propertyId: string,
    @Param('announcementId') announcementId: string,
    @Body() request: UpdateAnnouncementRequest,
  ) {
    return this.announcementsService.updateAnnouncement(propertyId, announcementId, request);
  }

  @Delete(':announcementId')
  @UseGuards(JwtAuthGuard, RolesGuard, IsAuthorizedGuard)
  @Roles(UserRole.OWNER, UserRole.MODERATOR)
  async deleteAnnouncement(@Param('propertyId') propertyId: string, @Param('announcementId') announcementId: string) {
    return this.announcementsService.deleteAnnouncement(propertyId, announcementId);
  }
}