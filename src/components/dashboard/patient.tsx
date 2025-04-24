import { User } from '@/hooks/use-auth';

interface PatientDashboardProps {
  user: User;
}

export default function PatientDashboard({ user }: PatientDashboardProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-green-100 text-green-800 text-sm p-3 px-5 rounded-md flex gap-3 items-center">
        Patient Dashboard - Welcome {user.user_metadata.firstName}
      </div>
      
      <h2 className="font-bold text-2xl">Patient Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="p-4 border rounded-md bg-white shadow-sm">
          <h3 className="font-semibold mb-2">Your Profile</h3>
          <p className="mb-1">Email: {user.email}</p>
          <p className="mb-1">Role: {user.user_metadata.role}</p>
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-800">
            Edit Profile
          </button>
        </div>
        
        <div className="p-4 border rounded-md bg-white shadow-sm">
          <h3 className="font-semibold mb-2">Medical Records</h3>
          <p className="text-gray-600">No medical records available</p>
        </div>
        
        <div className="p-4 border rounded-md bg-white shadow-sm">
          <h3 className="font-semibold mb-2">Appointments</h3>
          <p className="text-gray-600">No upcoming appointments</p>
          <button className="mt-4 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
            Book Appointment
          </button>
        </div>
        
        <div className="p-4 border rounded-md bg-white shadow-sm">
          <h3 className="font-semibold mb-2">Medications</h3>
          <p className="text-gray-600">No active medications</p>
        </div>
      </div> 




      <div>
        
      </div>
    </div>
  );
} 