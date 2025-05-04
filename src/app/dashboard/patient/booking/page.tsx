"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { MapPin, Stethoscope, Search } from "lucide-react";
import Link from "next/link";
import { FilterDoctors, GetSpecialities, GetWillayas } from "@/actions/actions";
import { Specialty, Willaya } from "@/types/types";
import Cardfind from "@/components/card-find";

export default function BookingPage() {
  const [specialization, setSpecialization] = useState<Specialty[] | undefined>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [location, setLocation] = useState<Willaya[] | undefined>([]);
  const [selectedLocation, setselectedLocation] = useState<string>("");
  const [filteredDoctors, setFilteredDoctors] = useState<any>();
  const yes = false;
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    async function FetchSpecialities() {
      const data = await GetSpecialities();
      if (data) {
        setSpecialization(data);
      }
    }

    async function FetchWillayas() {
      const data = await GetWillayas();
      if (data) {
        setLocation(data);
      }
    }
    FetchSpecialities();
    FetchWillayas();
  }, []);

  const handleFiletingDoctors = async (
    selectedSpecialty: string,
    selectedLocation: string,
    date: string
  ) => {
    try {
      const result = await FilterDoctors(selectedSpecialty, selectedLocation, date, );
      
      if (result && result.data) {
        setFilteredDoctors(result.data);
      } else {
        console.warn("No doctors found or invalid response:", result);
        setFilteredDoctors([]);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setFilteredDoctors([]);
    }
  };

  return (
    <div className="flex flex-col justify-between px-8 py-5 font-aeonik text-xl">
      <h1 className="mb-2 font-aeonik text-3xl font-medium tracking-tight text-[#025964]">
        Find a Doctor
      </h1>
      <p className="mb-8 text-start text-sm font-medium tracking-tight text-[#748191]">
        Search by doctors by their location, and specialization
      </p>

      <Card className="mb-8 rounded-lg border border-sky-300 bg-[#FAFBFC] p-6 shadow-sm">
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Specialization Filter */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-gray-500" />
              <label className="font-aeonik text-sm">Specialization</label>
            </div>
            <div className="relative">
              <select
                className="h-12 w-full cursor-pointer appearance-none rounded-md border bg-white px-4 font-aeonik text-sm text-[#748191] focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="">Select specialization</option>
                {specialization?.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <label className="font-aeonik text-sm">Location</label>
            </div>
            <div className="relative">
              <select
                className="h-12 w-full cursor-pointer appearance-none rounded-md border bg-white px-4 font-aeonik text-sm text-[#748191] focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={selectedLocation}
                onChange={(e) => setselectedLocation(e.target.value)}
              >
                <option value="">Select location</option>
                {location?.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <label className="font-aeonik text-sm">Appointment Date</label>
            </div>
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-12 w-full justify-start rounded-md border bg-white text-left font-aeonik text-sm tracking-widest text-[#748191] hover:bg-gray-50"
                  >
                    {date ? date.toLocaleDateString() : "Pick a Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto rounded-md border bg-white p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border-none"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Search and Clear Buttons */}
        <div className="flex w-full flex-row-reverse gap-4">
          <Button
            size="default"
            className="flex gap-4 bg-[#20504B] font-aeonik text-white"
            onClick={() =>
              handleFiletingDoctors(selectedSpecialty, selectedLocation, date?.toISOString() || "")
            }
            
          >
            <Search className="h-4 w-4" />
            Search Doctors
          </Button>
          {/* <Button size="lg" variant="outline" className="bg-white font-aeonik text-black h-12 rounded-md flex items-center gap-2">
            Clear Filters
          </Button> */}
        </div>
      </Card>

      {filteredDoctors && filteredDoctors.length > 0 ? (
  <div className="py-5 flex flex-wrap gap-3">
    {filteredDoctors.map((doc: any) => (
      <Cardfind key={doc.id} doctor={doc} />
    ))}
  </div>
) : (
  <div className="py-5 text-center">
    <h3 className="mb-2 font-aeonik text-xl text-[#013238]">No doctors found</h3>
    <p className="mb-4 text-center text-sm tracking-tight text-[#748191]">
      Try adjusting your filters to find available healthcare professionals.
    </p>
  </div>
)}
    </div>
  );
}
