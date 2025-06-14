export enum UserRole {
  OWNER = 'OWNER',
  MODERATOR = 'MODERATOR',
  GUEST = 'GUEST',
}

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
