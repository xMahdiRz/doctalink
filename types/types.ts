export interface DoctorProps {
  id: string;
  full_name: string;
  verified?: boolean;
  specialty_id?: string | null;
  commune_id?: string | null;
  willaya_id?: string | null;
  address?: string | null;
  commune?: string;
  willaya_name?: string | null;
}

export interface WillayaProps {
  id: string;
  name: string;
}
