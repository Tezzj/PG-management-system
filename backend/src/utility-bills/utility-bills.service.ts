import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUtilityBillRequest } from './dto/create-utility-bill.request'
import { UpdateUtilityBillRequest } from './dto/update-utility-bill.request'
import { CreateBillShareRequest } from './dto/create-bill-share.request'
import { UpdateBillShareRequest } from './dto/update-bill-share.request'

@Injectable()
export class UtilityBillsService {
  constructor(private readonly prismaService: PrismaService) { }

  async createUtilityBill(propertyId: string, data: CreateUtilityBillRequest) {
    return this.prismaService.utilityBill.create({
      data: {
        ...data,
        propertyId,
      },
    })
  }

  async getUtilityBills(propertyId: string) {
    return this.prismaService.utilityBill.findMany({
      where: { propertyId },
    })
  }

  async getUtilityBill(propertyId: string, billId: string) {
    const bill = await this.prismaService.utilityBill.findUnique({
      where: { id: billId },
    })
    if (bill?.propertyId !== propertyId) {
      throw new NotFoundException('Utility bill not found in this property')
    }
    return bill
  }

  async updateUtilityBill(propertyId: string, billId: string, data: UpdateUtilityBillRequest) {
    const bill = await this.prismaService.utilityBill.findUnique({
      where: { id: billId },
    })
    if (bill?.propertyId !== propertyId) {
      throw new NotFoundException('Utility bill not found in this property')
    }
    return this.prismaService.utilityBill.update({
      where: { id: billId },
      data,
    })
  }

  async deleteUtilityBill(propertyId: string, billId: string) {
    const bill = await this.prismaService.utilityBill.findUnique({
      where: { id: billId },
    })
    if (bill?.propertyId !== propertyId) {
      throw new NotFoundException('Utility bill not found in this property')
    }
    return this.prismaService.utilityBill.delete({
      where: { id: billId },
    })
  }

  async createBillShare(billId: string, data: CreateBillShareRequest) {
    return this.prismaService.billShare.create({
      data: {
        ...data,
        billId,
      },
    })
  }

  async getBillShares(billId: string) {
    return this.prismaService.billShare.findMany({
      where: { billId },
    })
  }

  async updateBillShare(billId: string, shareId: string, data: UpdateBillShareRequest) {
    const share = await this.prismaService.billShare.findUnique({
      where: { id: shareId },
    })
    if (share?.billId !== billId) {
      throw new NotFoundException('Bill share not found for this bill')
    }
    return this.prismaService.billShare.update({
      where: { id: shareId },
      data,
    })
  }

  async deleteBillShare(billId: string, shareId: string) {
    const share = await this.prismaService.billShare.findUnique({
      where: { id: shareId },
    })
    if (share?.billId !== billId) {
      throw new NotFoundException('Bill share not found for this bill')
    }
    return this.prismaService.billShare.delete({
      where: { id: shareId },
    })
  }
}