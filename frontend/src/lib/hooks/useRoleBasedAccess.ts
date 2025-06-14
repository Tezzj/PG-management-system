import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/features/authSlice';
import { UserRole } from '../types/user';

export const useRoleBasedAccess = () => {
  const user = useSelector(selectCurrentUser);

  const isOwner = user?.role === UserRole.OWNER;
  const isModerator = user?.role === UserRole.MODERATOR;
  const isGuest = user?.role === UserRole.GUEST;

  const canManageProperties = isOwner;
  const canEditProperty = isOwner || isModerator;
  const canManageRooms = isOwner || isModerator;
  const canManageResidents = isOwner || isModerator;
  const canCreateAnnouncements = isOwner || isModerator;
  const canManagePayments = isOwner || isModerator;
  const canViewPayments = true; // All roles can view payments
  const canCreateMaintenanceRequests = true; // All roles can create maintenance requests
  const canManageMaintenanceRequests = isOwner || isModerator;

  return {
    isOwner,
    isModerator,
    isGuest,
    canManageProperties,
    canEditProperty,
    canManageRooms,
    canManageResidents,
    canCreateAnnouncements,
    canManagePayments,
    canViewPayments,
    canCreateMaintenanceRequests,
    canManageMaintenanceRequests,
  };
};
