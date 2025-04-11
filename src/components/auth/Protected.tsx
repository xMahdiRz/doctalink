'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, User } from '@/hooks/use-auth';

interface ProtectedProps {
  children: ReactNode;
  requiredAction?: string;
  requiredSubject?: string;
  requiredRole?: string;
  fallback?: ReactNode;
}

export default function Protected({
  children,
  requiredAction,
  requiredSubject,
  requiredRole,
  fallback = null
}: ProtectedProps) {
  const router = useRouter();
  const user = typeof window !== 'undefined' ? 
    (window as any).__user as User : null;
  const { checkAccess, userRole } = useAuth(user);

  // If action and subject are specified, check permission
  if (requiredAction && requiredSubject) {
    if (!checkAccess(requiredAction, requiredSubject)) {
      return fallback;
    }
  }

  // If a specific role is required
  if (requiredRole && userRole !== requiredRole) {
    return fallback;
  }

  return <>{children}</>;
} 