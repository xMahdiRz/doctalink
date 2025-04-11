'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getRoleFromUser, hasPermission } from './rbac';
import { Role } from './types';

export async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  return user;
}

export async function requirePermission(action: string, subject: string) {
  const user = await requireAuth();
  const role = getRoleFromUser(user);
  
  if (!hasPermission(role, action, subject)) {
    redirect('/unauthorized');
  }
  
  return user;
}

export async function requireRole(requiredRole: Role) {
  const user = await requireAuth();
  const role = getRoleFromUser(user);
  
  if (role !== requiredRole) {
    redirect('/unauthorized');
  }
  
  return user;
}

export async function getCurrentUserRole(): Promise<Role | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  return getRoleFromUser(user);
} 