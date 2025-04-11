import { User } from '@/hooks/use-auth';

interface DoctorDashboardProps {
  user: User;
}

export default function DoctorDashboard({ user }: DoctorDashboardProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-blue-100 text-blue-800 text-sm p-3 px-5 rounded-md flex gap-3 items-center">
        Doctor Dashboard - Welcome Dr. {user.email}
      </div>
      
      <h2 className="font-bold text-2xl">Doctor Portal</h2>
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
          <h3 className="font-semibold mb-2">Patient Management</h3>
          <p className="text-gray-600">You have 0 patients assigned</p>
          <button className="mt-4 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
            View Patients
          </button>
        </div>
        
        <div className="p-4 border rounded-md bg-white shadow-sm">
          <h3 className="font-semibold mb-2">Schedule</h3>
          <p className="text-gray-600">No upcoming appointments</p>
          <button className="mt-4 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
            Manage Schedule
          </button>
        </div>
        
        <div className="p-4 border rounded-md bg-white shadow-sm">
          <h3 className="font-semibold mb-2">Recent Activities</h3>
          <ul className="text-sm text-gray-600">
            <li className="py-1 border-b">No recent activities</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 