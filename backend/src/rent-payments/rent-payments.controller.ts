import { Controller, Post, Body, Param, Get, Put, Delete, UseGuards } from '@nestjs/common'
import { RentPaymentsService } from './rent-payments.service'
import { CreateRentPaymentRequest } from './dto/create-rent-payment.request'
import { UpdateRentPaymentRequest } from './dto/update-rent-payment.request'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/roles.decorator'
import { UserRole } from '@prisma/client'

@Controller('users/:userId/rent-payments')
export class RentPaymentsController {
  constructor(private readonly rentPaymentsService: RentPaymentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER, UserRole.MODERATOR)
  async createRentPayment(@Param('userId') userId: string, @Body() request: CreateRentPaymentRequest) {
    return this.rentPaymentsService.createRentPayment(userId, request)
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER, UserRole.MODERATOR, UserRole.GUEST)
  async getRentPayments(@Param('userId') userId: string) {
    return this.rentPaymentsService.getRentPayments(userId)
  }

  @Get(':paymentId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER, UserRole.MODERATOR, UserRole.GUEST)
  async getRentPayment(@Param('userId') userId: string, @Param('paymentId') paymentId: string) {
    return this.rentPaymentsService.getRentPayment(userId, paymentId)
  }

  @Put(':paymentId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER, UserRole.MODERATOR)
  async updateRentPayment(
    @Param('userId') userId: string,
    @Param('paymentId') paymentId: string,
    @Body() request: UpdateRentPaymentRequest,
  ) {
    return this.rentPaymentsService.updateRentPayment(userId, paymentId, request)
  }

  @Delete(':paymentId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER, UserRole.MODERATOR)
  async deleteRentPayment(@Param('userId') userId: string, @Param('paymentId') paymentId: string) {
    return this.rentPaymentsService.deleteRentPayment(userId, paymentId)
  }
}