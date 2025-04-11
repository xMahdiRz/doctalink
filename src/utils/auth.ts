import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export type UserRole = "patient" | "doctor";

export async function getUserRole(): Promise<UserRole | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data: userData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("id", user.id)
    .single();
    
  return userData?.role || null;
}

export async function requireRole(requiredRole: UserRole) {
  const role = await getUserRole();
  
  if (!role) {
    redirect("/sign-in");
  }
  
  if (role !== requiredRole) {
    redirect("/unauthorized");
  }
  
  return role;
}

export async function requireAuth() {
  const role = await getUserRole();
  
  if (!role) {
    redirect("/sign-in");
  }
  
  return role;
} 