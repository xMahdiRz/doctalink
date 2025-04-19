import { getDoctorNames } from "@/actions/actions";

export default async function TestPage() {
  const doctorNames = await getDoctorNames();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctorNames?.map((doc) => (
          <div
            key={doc.full_name}
            className="p-4 border rounded-md bg-white shadow-sm"
          >
            <h3 className="font-semibold mb-2">{doc.full_name}</h3>
            <p className="text-sm text-gray-600">{doc.adress}</p>
            <p className="text-sm text-gray-600">{doc.commune_id}</p>
            <p className="text-sm text-gray-600">{doc.specialty_id}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
}