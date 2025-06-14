export interface Announcement {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  propertyId: string;
  createdById: string;
}

export interface CreateAnnouncementRequest {
  title: string;
  message: string;
}

export interface UpdateAnnouncementRequest {
  title?: string;
  message?: string;
}
