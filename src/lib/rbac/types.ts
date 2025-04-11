export type Role = 'patient' | 'doctor' | 'admin';

export interface Permission {
  action: string;
  subject: string;
}

// Define permissions for each role
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  patient: [
    { action: 'read', subject: 'patient-profile' },
    { action: 'read', subject: 'appointments' },
    { action: 'create', subject: 'appointments' },
    { action: 'update', subject: 'patient-profile' },
  ],
  doctor: [
    { action: 'read', subject: 'doctor-profile' },
    { action: 'update', subject: 'doctor-profile' },
    { action: 'read', subject: 'appointments' },
    { action: 'update', subject: 'appointments' },
    { action: 'read', subject: 'patients' },
    { action: 'create', subject: 'medical-record' },
    { action: 'update', subject: 'medical-record' },
  ],
  admin: [
    { action: 'read', subject: 'all' },
    { action: 'create', subject: 'all' },
    { action: 'update', subject: 'all' },
    { action: 'delete', subject: 'all' },
  ],
}; 