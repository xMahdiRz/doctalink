type DoctorCardProps = {
    doctor: {
      id: string;
      full_name: string;
      address: string;
      specialty: { name: string };
      commune: { name: string };
      willaya: { name: string };
    };
    time: string;
  };
  
  export function DoctorCard({ doctor, time }: DoctorCardProps) {
    const formattedTime = new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    return (
      <div className="border rounded-xl p-4 shadow-sm bg-white mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{doctor.full_name}</h2>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
            {formattedTime}
          </span>
        </div>
  
        <p className="text-sm text-gray-700 mt-1">
          📍 {doctor.willaya.name}, {doctor.commune.name}
        </p>
        <p className="text-sm text-gray-700">🎓 {doctor.specialty.name}</p>
        <p className="text-sm text-gray-700">🏠 {doctor.address}</p>
      </div>
    );
  }