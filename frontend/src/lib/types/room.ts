export enum RoomStatus {
  VACANT = 'VACANT',
  OCCUPIED = 'OCCUPIED',
  MAINTENANCE = 'MAINTENANCE',
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  capacity: number;
  status: RoomStatus;
  rentAmount: number;
  createdAt: string;
  updatedAt: string;
  propertyId: string;
}

export interface CreateRoomRequest {
  number: string;
  floor: number;
  capacity: number;
  status: RoomStatus;
  rentAmount: number;
}

export interface UpdateRoomRequest {
  number?: string;
  floor?: number;
  capacity?: number;
  status?: RoomStatus;
  rentAmount?: number;
}
