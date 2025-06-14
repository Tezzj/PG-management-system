export enum MaintenanceStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  status: MaintenanceStatus;
  createdAt: string;
  updatedAt: string;
  propertyId: string;
  roomId?: string;
  requestedById: string;
}

export interface CreateMaintenanceRequestRequest {
  title: string;
  description: string;
  status?: MaintenanceStatus;
  roomId?: string;
}

export interface UpdateMaintenanceRequestRequest {
  title?: string;
  description?: string;
  status?: MaintenanceStatus;
  roomId?: string;
}
