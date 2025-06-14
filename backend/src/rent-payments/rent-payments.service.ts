import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateRentPaymentRequest } from './dto/create-rent-payment.request'
import { UpdateRentPaymentRequest } from './dto/update-rent-payment.request'

@Injectable()
export class RentPaymentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRentPayment(userId: string, data: CreateRentPaymentRequest) {
    return this.prismaService.rentPayment.create({
      data: {
        ...data,
        userId,
      },
    })
  }

  async getRentPayments(userId: string) {
    return this.prismaService.rentPayment.findMany({
      where: { userId },
    })
  }

  async getRentPayment(userId: string, paymentId: string) {
    const payment = await this.prismaService.rentPayment.findUnique({
      where: { id: paymentId },
    })
    if (payment?.userId !== userId) {
      throw new NotFoundException('Rent payment not found for this user')
    }
    return payment
  }

  async updateRentPayment(userId: string, paymentId: string, data: UpdateRentPaymentRequest) {
    const payment = await this.prismaService.rentPayment.findUnique({
      where: { id: paymentId },
    })
    if (payment?.userId !== userId) {
      throw new NotFoundException('Rent payment not found for this user')
    }
    return this.prismaService.rentPayment.update({
      where: { id: paymentId },
      data,
    })
  }

  async deleteRentPayment(userId: string, paymentId: string) {
    const payment = await this.prismaService.rentPayment.findUnique({
      where: { id: paymentId },
    })
    if (payment?.userId !== userId) {
      throw new NotFoundException('Rent payment not found for this user')
    }
    return this.prismaService.rentPayment.delete({
      where: { id: paymentId },
    })
  }
}