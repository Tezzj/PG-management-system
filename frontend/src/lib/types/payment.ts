export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
}

export interface RentPayment {
  id: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateRentPaymentRequest {
  amount: number;
  dueDate: string;
  status: PaymentStatus;
}

export interface UpdateRentPaymentRequest {
  amount?: number;
  dueDate?: string;
  paidDate?: string;
  status?: PaymentStatus;
}
