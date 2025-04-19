


export interface DoctorProps {
    id: string; 
    full_name: string;
    verified?: boolean;
    specialty_id?: string | null;
    location_id?: string | null;
    commune_id?: string | null;
    willaya_id?: string | null;
    adress?: string | null;
  }