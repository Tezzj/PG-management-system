import { useToast as useToastOriginal } from '@/hooks/use-toast';
import { toast as toastImpl } from '@/hooks/use-toast';

export const useToast = useToastOriginal;
export const toast = toastImpl;
