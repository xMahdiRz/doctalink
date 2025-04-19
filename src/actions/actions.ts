"use server"

import { createClient } from "@/utils/supabase/server";
import { DoctorProps } from "../../types/types";



export async function getDoctorNames(): Promise<DoctorProps[] | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .order("full_name", { ascending: true });
  if (error) {
    console.error("Error fetching doctors:", error);
    return;
  }
  return data as DoctorProps[];
}


