export interface Residency {
  id: string;
  startDate: string;
  endDate?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  residentId: string;
  roomId: string;
}

export interface CreateResidencyRequest {
  residentId: string;
  startDate: string;
  endDate?: string;
}

export interface UpdateResidencyRequest {
  startDate?: string;
  endDate?: string;
  active?: boolean;
}
