import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyRequest } from './dto/create-property.request';
import { UpdatePropertyRequest } from './dto/update-property.request';
import { SetModeratorsRequest } from '../auth/dto/set-moderators.request';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IsOwnerGuard } from '../auth/guards/is-owner.guard';
import { IsAuthorizedGuard } from '../auth/guards/is-authorized.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  async createProperty(
    @Body() request: CreatePropertyRequest,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.propertiesService.createProperty(request, user.userId);
  }

  @Get()
@UseGuards(JwtAuthGuard, RolesGuard) // adjust guards as needed
@Roles(UserRole.OWNER, UserRole.MODERATOR) // roles who can view list
async getProperties(@CurrentUser() user: TokenPayload) {
  return this.propertiesService.getProperties(user.userId);
}

  @Get(':id')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async getProperty(@Param('id') id: string) {
    return this.propertiesService.getProperty(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async updateProperty(
    @Param('id') id: string,
    @Body() request: UpdatePropertyRequest,
  ) {
    return this.propertiesService.updateProperty(id, request);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, IsOwnerGuard)
  async deleteProperty(@Param('id') id: string) {
    return this.propertiesService.deleteProperty(id);
  }

  @Put(':id/moderators')
  @UseGuards(JwtAuthGuard, IsOwnerGuard)
  async setModerators(
    @Param('id') propertyId: string,
    @Body() request: SetModeratorsRequest,
  ) {
    return this.propertiesService.setModerators(propertyId, request);
  }
}