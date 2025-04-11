'use client';

import { useCallback } from 'react';
import { canAccess, getRoleFromUser } from '@/lib/rbac/rbac';
import { Role } from '@/lib/rbac/types';

export interface User {
  id: string;
  email?: string;
  user_metadata: {
    role?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export function useAuth(user: User | null) {
  const userRole = user ? getRoleFromUser(user) : null;
  
  const checkAccess = useCallback(
    (action: string, subject: string) => {
      if (!user) return false;
      return canAccess(user, action, subject);
    },
    [user]
  );
  
  const isDoctor = useCallback(() => userRole === 'doctor', [userRole]);
  const isPatient = useCallback(() => userRole === 'patient', [userRole]);
  const isAdmin = useCallback(() => userRole === 'admin', [userRole]);
  
  return {
    user,
    userRole,
    checkAccess,
    isDoctor,
    isPatient,
    isAdmin,
  };
} 