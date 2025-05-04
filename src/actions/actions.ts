"use server"
import { Specialty, Willaya } from "@/types/types";
import { supabase } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";


/* export async function getDoctorNames(): Promise<{ doctor_name: string; willaya_name: string | null }[] | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('doctors')
    .select(`
      full_name,
      willaya:willaya_id (
        name
      )
    `);

  if (error) {
    console.error('Error fetching doctors:', error);
    return undefined;
  }

  // Map to match the SQL join result
 
  const result = data.map((d: any) => ({
    doctor_name: d.full_name,
    willaya_name: d.willaya?.name || null
  }));

  return result;
}


export async function getDoctorsByLocations(params: { willaya_name: string }) {
  const supabase = await createClient();
  
  // First, get the willaya ID that matches the name
  const { data: willayaData, error: willayaError } = await supabase
    .from('willayas')
    .select('id')
    .eq('name', params.willaya_name)
    .single();
    
  if (willayaError) {
    console.error('Error fetching willaya:', willayaError);
    return undefined;
  }
  
  // Then use the willaya ID to filter doctors
  const { data, error } = await supabase
    .from('doctors')
    .select(`
      full_name,
      willayas!inner(
        name
      )
    `)
    .eq('willaya_id', willayaData.id);

  if (error) {
    console.error('Error fetching doctors:', error);
    return undefined;
  }

  // Map to match the expected output format
  const result = data.map((d: any) => ({
    doctor_name: d.full_name,
    willaya_name: d.willayas.name
  }));

  return result;
}

 */

/* export async function getCommunesByWillaya(params: { willaya_name: string }) {
  const supabase = await createClient();
  
  // First, get the willaya ID that matches the name
  const { data: willayaData, error: willayaError } = await supabase
    .from('willayas')
    .select('id')
    .eq('name', params.willaya_name)
    .single();
    
  if (willayaError) {
    console.error('Error fetching willaya:', willayaError);
    return undefined;
  }
  
  // Then use the willaya ID to filter doctors
  const { data, error } = await supabase
    .from('communes')
    .select(`
      name
      )
    `)
    .eq('willaya_id', willayaData.id);

  if (error) {
    console.error('Error fetching doctors:', error);
    return undefined;
  }

  // Map to match the expected output format
  const result = data.map((d: any) => ({
    commune_name: d.name
  }));

  return result;
} */

/* export async function getTimes() {
  const supabase = await createClient();
  const {data, error} = await supabase
  .from('doctor_availabilities').select('*');
  
  if (error){
    console.error('Error fetching times:', error);
    return;
  }
  
  const result = data.map((d: any) => ({
    doctor_name: d.doctor_name,
    time: d.time
  }));
  
  return result;
} */

// export name, adrress, speciality, time slots,

/* export async function generateDoctorSlots({
  doctorId,
  startHour = 9,
  endHour = 12,
  intervalMinutes = 30,
  daysOfWeek = [1, 2, 3, 4, 5], // Monday to Friday
  daysInAdvance = 7,
}: {
  doctorId: string;
  startHour?: number;
  endHour?: number;
  intervalMinutes?: number;
  daysOfWeek?: number[]; // 0 = Sunday ... 6 = Saturday
  daysInAdvance?: number;
}) {
  const supabase = await createClient();
  const slots: {
    doctor_id: string;
    date: string;
    time: string;
    is_booked: boolean;
  }[] = [];

  const now = new Date();

  for (let dayOffset = 0; dayOffset < daysInAdvance; dayOffset++) {
    const day = new Date(now);
    day.setDate(now.getDate() + dayOffset);

    const weekday = day.getDay(); // 0 = Sunday, 1 = Monday...

    if (!daysOfWeek.includes(weekday)) continue;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const timeStr = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;

        slots.push({
          doctor_id: doctorId,
          date: day.toISOString().split("T")[0], // 'YYYY-MM-DD'
          time: timeStr,
          is_booked: false,
        });
      }
    }
  }

  const { data, error } = await supabase
    .from("doctor_availability")
    .insert(slots);

  if (error) {
    console.error("Failed to insert slots:", error.message);
  } else {
    console.log("Inserted slots:", data);
  }
} */
  
// Change the function to accept a date parameter
/* export async function getAvailableDoctors(date: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("doctor_availabilities")
    .select(`
      id,
      date,
      time,
      is_booked,
      doctor:doctor_id (
        id,
        full_name,
        address,
        specialty:specialty_id ( name ),
        commune:commune_id ( name ),
        willaya:willaya_id ( name )
      )
    `)
    .eq("date", date)
    .eq("is_booked", false)
    .order("time", { ascending: true });
  if (error) {
    console.log("Error fetching availability:", error);
    return [];
  }
  const result = data.map((d: any) => ({
    id: d.id,
    time: d.time,
    doctor: {
      id: d.doctor.id,
      full_name: d.doctor.full_name,
      address: d.doctor.address,
      specialty: { name: d.doctor.specialty.name },
      commune: { name: d.doctor.commune.name },
      willaya: { name: d.doctor.willaya.name }
    }
  }));
  return result;
}

 */





export async function getDoctorCards(): Promise<{ 
  id: string; 
  full_name: string; 
  commune: { name: string } | null; 
  willaya: { name: string } | null; 
  specialty: { name: string } | null; 
  address: string; 
  appointments: {
    selected_time: string | null;
    selected_date: string | null;
  }[]; 
}[] | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('doctors')
    .select(`
      id, 
      full_name, 
      commune:communes(name), 
      willaya:willayas(name), 
      specialty:specialties(name), 
      address, 
      appointments(
        selected_time,
        selected_date
      )
    `);

  if (error) {
    console.error('Error fetching doctors:', error);
    return undefined;
  }
  return data.map((d: any) => ({
    id: d.id,
    full_name: d.full_name,
    commune: d.commune,
    willaya: d.willaya,
    specialty: d.specialty || null,
    address: d.address || "",
    appointments: (d.appointments || []).map((appointment: any) => ({
      selected_date: appointment.selected_date,
    
      selected_time: appointment.selected_time ? 
        appointment.selected_time.split(':').slice(0, 2).join(':') : 
        null
    })),
  }));
  
}



export async function GetSpecialities(): Promise<Specialty[] | undefined> {
  const {data, error}  = await supabase.from('specialties').select('*');
  if (error) {
    console.error('Error fetching specialties:', error);
    return undefined;
  }
  return data ?? undefined;  
}

export async function GetWillayas(): Promise<Willaya[] | undefined> {
  const {data, error}  = await supabase.from('willayas').select('*');
  if (error) {
    console.error('Error fetching specialties:', error);
    return undefined;
  }
  return data ?? undefined;  
}



export async function FilterDoctors(specialty: string, location: string, date: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("doctors")
    .select(`
      id,
      full_name,
      commune:communes(name),
      willaya:willayas(name),
      specialty:specialties(name),
      address,
      appointments(selected_date)
    `)
    .eq("specialties.name", specialty)
    .eq("willayas.name", location);

  if (error) {
    console.error("Error filtering doctors:", error);
    return { data: [] };
  }

  const availableDoctors = data?.filter((doc: any) => {
    return !doc.appointments.some(
      (appt: any) => appt.selected_date === date
    );
  });

  console.log(data)

  return { data: availableDoctors };
}
