import { ROLE_PERMISSIONS, Role, Permission } from './types';

export function hasPermission(role: Role | undefined | null, action: string, subject: string): boolean {
  if (!role) return false;
  
  const rolePermissions = ROLE_PERMISSIONS[role as Role] || [];
  
  // Check for direct permission
  const hasDirectPermission = rolePermissions.some(
    (permission) => permission.action === action && permission.subject === subject
  );
  
  // Check for wildcard permission
  const hasWildcardPermission = rolePermissions.some(
    (permission) => permission.action === action && permission.subject === 'all'
  );
  
  return hasDirectPermission || hasWildcardPermission;
}

export function getRoleFromUser(user: any): Role | null {
  if (!user || !user.user_metadata || !user.user_metadata.role) {
    return null;
  }
  
  const userRole = user.user_metadata.role;
  
  // Validate role is one of our defined roles
  if (Object.keys(ROLE_PERMISSIONS).includes(userRole)) {
    return userRole as Role;
  }
  
  return null;
}

export function getPermissionsForRole(role: Role | null): Permission[] {
  if (!role) return [];
  return ROLE_PERMISSIONS[role] || [];
}

export function canAccess(user: any, action: string, subject: string): boolean {
  const role = getRoleFromUser(user);
  return hasPermission(role, action, subject);
} 