"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { Stethoscope } from "lucide-react";
import { Search } from "lucide-react";
import Link from "next/link";

export default function BookingPage() {
  const [specialization, setSpecialization] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date())




  return (
    <div className="px-8">
      <h1 className="text-3xl font-aeonik font-medium tracking-tight mb-2">Find a Doctor</h1>
      <p className="text-gray-500 mb-8">Search by doctors by their location, and specialization</p>

      <Card className="p-6 mb-8 bg-[#FAFBFC] border-[#] ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Specialization Filter */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="h-5 w-5 text-gray-500" />
              <label className="font-medium">Specialization</label>
            </div>
            <div className="relative">
              <select
                className="w-full p-2.5 border rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              >
                <option value="">Select specialization</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <label className="font-medium">Location</label>
            </div>
            <div className="relative">
              <select
                className="w-full p-2.5 border rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Select location</option>
                <option value="new-york">New York</option>
                <option value="los-angeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
                <option value="houston">Houston</option>
                <option value="miami">Miami</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Appointment Date Filter */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <label className="font-medium">Appointment Date</label>
            </div>
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Input
                    readOnly
                    value={"Pick a date"}
                    placeholder="Pick a date"
                    className="cursor-pointer p-2.5 bg-white text-left border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto bg-white border rounded-md">
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

        {/* Search Button */}

        <div className="flex flex-row-reverse w-full  gap-4 ">
          <Button size={"default"} className="bg-[#20504B] h text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search Doctors
          </Button>
          <Button size={"default"} className="bg-white  text-black  rounded-md flex items-center gap-2">
            Clear Filters
          </Button>
        </div>

        <div className="flex justify-end">
          
        </div>
      </Card>

      {/* No Search Results Message */}
      <div className="text-center py-5">
        <h3 className="text-xl font-medium mb-2">No search filters applied yet</h3>
        <p className="text-gray-500 mb-4">
          Select a date, location, or specialization above and click<br />
          "Search Doctors" to find available healthcare professionals.
        </p>
        <Link href="/dashboard/patient/doctors" className="text-teal-600 hover:text-teal-700 flex items-center justify-center gap-1">
          View all doctors <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
}

