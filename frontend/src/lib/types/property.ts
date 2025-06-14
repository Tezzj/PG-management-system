import type { UserRole } from './user';

export enum PropertyType {
  PG = 'PG',
  HOSTEL = 'HOSTEL',
  APARTMENT = 'APARTMENT',
  HOTEL = 'HOTEL',
  OTHER = 'OTHER',
}

export interface Property {
  id: string;
  name: string;
  propertyType: PropertyType;
  address: string;
  city: string;
  state: string;
  pincode: string;
  totalRooms: number;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface CreatePropertyRequest {
  name: string;
  propertyType: PropertyType;
  address: string;
  city: string;
  state: string;
  pincode: string;
  totalRooms: number;
}

export interface UpdatePropertyRequest {
  name?: string;
  propertyType?: PropertyType;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  totalRooms?: number;
}

export interface PropertyWithOwner extends Property {
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
  };
}
