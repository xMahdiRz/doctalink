import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/rbac/server-auth";
import { getRoleFromUser } from "@/lib/rbac/rbac";
import AuthButton from "@/components/header-auth";
import PatientDashboard from "@/components/dashboard/patient";
import DoctorDashboard from "@/components/dashboard/doctor";

export default async function Dashboard() {
  // We use our new RBAC system to require authentication
  const user = await requireAuth();
  const userRole = getRoleFromUser(user);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <AuthButton />
      </div>
      
      {/* Conditionally render the appropriate dashboard based on role */}
      {userRole === "patient" && (
        <PatientDashboard user={user} />
      )}
      
      {userRole === "doctor" && (
        <DoctorDashboard user={user} />
      )}
      
      {/* Fallback content for unrecognized roles */}
      {!userRole && (
        <div className="flex flex-col gap-2 items-start">
          <div className="bg-yellow-100 text-yellow-800 text-sm p-3 px-5 rounded-md flex gap-3 items-center w-full">
            You are logged in, but your role is not recognized. Please contact support.
          </div>
          <h2 className="font-bold text-2xl mb-4">Your user details</h2>
          <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      )}
      
      {/* Add a script to make user available on the client side for the Protected component */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__user = ${JSON.stringify(user)};`,
        }}
      />
    </div>
  );
}
