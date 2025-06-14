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
import { RoomsService } from './rooms.service';
import { CreateRoomRequest } from './dto/create-room.request';
import { UpdateRoomRequest } from './dto/update-room.request';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsAuthorizedGuard } from '../auth/guards/is-authorized.guard';

@Controller('properties/:propertyId/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async createRoom(
    @Param('propertyId') propertyId: string,
    @Body() request: CreateRoomRequest,
  ) {
    return this.roomsService.createRoom(propertyId, request);
  }

  @Get()
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async getRooms(@Param('propertyId') propertyId: string) {
    return this.roomsService.getRooms(propertyId);
  }

  @Get(':roomId')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async getRoom(
    @Param('propertyId') propertyId: string,
    @Param('roomId') roomId: string,
  ) {
    return this.roomsService.getRoom(propertyId, roomId);
  }

  @Put(':roomId')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async updateRoom(
    @Param('propertyId') propertyId: string,
    @Param('roomId') roomId: string,
    @Body() request: UpdateRoomRequest,
  ) {
    return this.roomsService.updateRoom(propertyId, roomId, request);
  }

  @Delete(':roomId')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async deleteRoom(
    @Param('propertyId') propertyId: string,
    @Param('roomId') roomId: string,
  ) {
    return this.roomsService.deleteRoom(propertyId, roomId);
  }
}