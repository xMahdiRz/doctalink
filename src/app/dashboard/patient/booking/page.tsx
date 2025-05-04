"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { MapPin, Stethoscope, Search } from "lucide-react";
import Link from "next/link";

export default function BookingPage() {
  const [specialization, setSpecialization] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col justify-between px-8 py-5 font-aeonik text-xl">
      <h1 className="mb-2 font-aeonik text-3xl font-medium tracking-tight text-[#025964]">
        Find a Doctor
      </h1>
      <p className="mb-8 text-start text-sm font-medium tracking-tight text-[#748191]">
        Search by doctors by their location, and specialization
      </p>

      <Card className="mb-8 border border-sky-300 bg-[#FAFBFC] p-6 shadow-sm rounded-lg">
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3 ">
          {/* Specialization Filter */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-gray-500" />
              <label className="font-aeonik text-sm">Specialization</label>
            </div>
            <div className="relative">
              <select
                className="h-12 w-full cursor-pointer appearance-none rounded-md border bg-white px-4 font-aeonik text-sm text-[#748191] focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                className="h-12 w-full cursor-pointer appearance-none rounded-md border bg-white px-4 text-sm text-[#748191] focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                    className="h-12 w-full justify-start rounded-md border bg-white text-left font-aeonik text-sm text-[#748191] hover:bg-gray-50"
                  >
                    Pick a Date
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
            className="flex gap-4  bg-[#20504B] font-aeonik text-white"
          >
            <Search className="h-4 w-4" />
            Search Doctors
          </Button>
          {/* <Button size="lg" variant="outline" className="bg-white font-aeonik text-black h-12 rounded-md flex items-center gap-2">
            Clear Filters
          </Button> */}
        </div>
      </Card>

      
      <div className="py-5 text-center  ">
        <h3 className="mb-2 text-xl text-[#013238] font-aeonik">No search filters applied yet</h3>
        <p className="mb-4 text-[#748191] text-sm tracking-tight text-center ">
          Select a date, location, or specialization above and click
          <br />
          "Search Doctors" to find available healthcare professionals.
        </p>
        <Link
          href="/dashboard/patient/doctors"
          className="flex items-center justify-center font-aeonik gap-1 text-sm text-[#00747A] hover:text-teal-700"
        >
          View all doctors <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
}
