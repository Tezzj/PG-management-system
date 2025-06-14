import type { PaymentStatus } from './payment';

export interface UtilityBill {
  id: string;
  type: string;
  totalAmount: number;
  billDate: string;
  dueDate: string;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  propertyId: string;
}

export interface BillShare {
  id: string;
  amount: number;
  paid: boolean;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  billId: string;
  userId: string;
}

export interface CreateUtilityBillRequest {
  type: string;
  totalAmount: number;
  billDate: string;
  dueDate: string;
  status: PaymentStatus;
}

export interface UpdateUtilityBillRequest {
  type?: string;
  totalAmount?: number;
  billDate?: string;
  dueDate?: string;
  status?: PaymentStatus;
}

export interface CreateBillShareRequest {
  userId: string;
  amount: number;
  paid: boolean;
}

export interface UpdateBillShareRequest {
  userId?: string;
  amount?: number;
  paid?: boolean;
  paidAt?: string;
}
