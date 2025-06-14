import { Controller, Post, Body, Param, Get, Put, Delete, UseGuards } from '@nestjs/common'
import { UtilityBillsService } from './utility-bills.service'
import { CreateUtilityBillRequest } from './dto/create-utility-bill.request'
import { UpdateUtilityBillRequest } from './dto/update-utility-bill.request'
import { CreateBillShareRequest } from './dto/create-bill-share.request'
import { UpdateBillShareRequest } from './dto/update-bill-share.request'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { IsAuthorizedGuard } from '../auth/guards/is-authorized.guard'

@Controller('properties/:propertyId/utility-bills')
export class UtilityBillsController {
  constructor(private readonly utilityBillsService: UtilityBillsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async createUtilityBill(@Param('propertyId') propertyId: string, @Body() request: CreateUtilityBillRequest) {
    return this.utilityBillsService.createUtilityBill(propertyId, request)
  }

  @Get()
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async getUtilityBills(@Param('propertyId') propertyId: string) {
    return this.utilityBillsService.getUtilityBills(propertyId)
  }

  @Get(':billId')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async getUtilityBill(@Param('propertyId') propertyId: string, @Param('billId') billId: string) {
    return this.utilityBillsService.getUtilityBill(propertyId, billId)
  }

  @Put(':billId')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async updateUtilityBill(
    @Param('propertyId') propertyId: string,
    @Param('billId') billId: string,
    @Body() request: UpdateUtilityBillRequest,
  ) {
    return this.utilityBillsService.updateUtilityBill(propertyId, billId, request)
  }

  @Delete(':billId')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async deleteUtilityBill(@Param('propertyId') propertyId: string, @Param('billId') billId: string) {
    return this.utilityBillsService.deleteUtilityBill(propertyId, billId)
  }

  @Post(':billId/shares')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async createBillShare(@Param('billId') billId: string, @Body() request: CreateBillShareRequest) {
    return this.utilityBillsService.createBillShare(billId, request)
  }

  @Get(':billId/shares')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async getBillShares(@Param('billId') billId: string) {
    return this.utilityBillsService.getBillShares(billId)
  }

  @Put(':billId/shares/:shareId')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async updateBillShare(
    @Param('billId') billId: string,
    @Param('shareId') shareId: string,
    @Body() request: UpdateBillShareRequest,
  ) {
    return this.utilityBillsService.updateBillShare(billId, shareId, request)
  }

  @Delete(':billId/shares/:shareId')
  @UseGuards(JwtAuthGuard, IsAuthorizedGuard)
  async deleteBillShare(@Param('billId') billId: string, @Param('shareId') shareId: string) {
    return this.utilityBillsService.deleteBillShare(billId, shareId)
  }
}