"use client";

import { getDoctorCards } from "@/actions/actions";
import Image from "next/image";
import { useEffect, useState } from "react";

type Doctor = {
  id: string;
  full_name: string;
  commune: { name: string } | null;
  willaya: { name: string } | null;
  specialty: { name: string } | null;
  address: string;
  appointments: {
    selected_time: string | null;
    selected_date: string | null;
  }[];
};

export default function DoctorCards() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate consistent time slots with 30-minute intervals
  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let hour = 8; hour < 18; hour++) {
      for (const minute of [0, 30]) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    async function fetchDoctors() {
      const data = await getDoctorCards();
      if (data) {
        setDoctors(data);
      }
    }
    fetchDoctors();
  }, []);

  // Generate an array of next 7 days for the calendar header
  const generateWeekDays = (startDate: Date) => {
    const days = [];
    const dayNames = [
      "dimanche",
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
    ];
    const monthNames = [
      "janv.",
      "févr.",
      "mars",
      "avr.",
      "mai",
      "juin",
      "juil.",
      "août",
      "sept.",
      "oct.",
      "nov.",
      "déc.",
    ];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      days.push({
        day: dayNames[date.getDay()],
        date: date.getDate(),
        month: monthNames[date.getMonth()],
      });
    }
    return days;
  };

  const weekDays = generateWeekDays(selectedDate);

  // Function to format date as YYYY-MM-DD for comparison
  const formatDateForComparison = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // Check if a time slot is booked for a doctor on a specific date
  const isTimeSlotBooked = (doctor: Doctor, timeSlot: string, date: Date) => {
    if (!doctor) return false;

    const formattedDate = formatDateForComparison(date);

    return doctor.appointments.some(
      (appointment) =>
        appointment.selected_time === timeSlot &&
        appointment.selected_date === formattedDate
    );
  };

  // Navigate to previous week
  const prevWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  // Navigate to next week
  const nextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  if (doctors.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Week navigation - Shared across all doctors */}

      {/* Doctor cards */}
      <div className="space-y-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            {/* Calendar header with week navigation */}
            <div className="sticky top-0 z-10 bg-white border-b">
              <div className="flex justify-between items-center px-4 py-3">
                <button
                  onClick={prevWeek}
                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
                  aria-label="Previous week"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Days of the week */}
                <div className="grid grid-cols-6 gap-3 text-center">
                  {weekDays.slice(0, 6).map((day, index) => (
                    <div 
                      key={index} 
                      className={`text-sm py-2 px-1 rounded-lg transition-colors ${
                        index === 0 ? 'bg-blue-50 text-blue-700 font-medium' : ''
                      }`}
                    >
                      <div className="font-medium capitalize">{day.day}</div>
                      <div className="mt-1">
                        {day.date} {day.month}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={nextWeek}
                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
                  aria-label="Next week"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[320px_1fr]">
              {/* Doctor information column */}
              <div className="p-6 border-r bg-white">
                <div className="flex flex-col">
                  {/* Doctor header with image and badge */}
                  <div className="flex items-center mb-4">
                    <div className="relative mr-4">
                      <Image
                        src="/doctor.jpeg"
                        width={64}
                        height={64}
                        alt={doctor.full_name}
                        className="rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" title="Available now"></div>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">
                        Dr {doctor.full_name}
                      </h2>
                      <p className="text-blue-600 font-medium">
                        {doctor.specialty?.name || "Médecin généraliste"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm">
                    {/* Address */}
                    <div className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-gray-700 font-medium">{doctor.address}</p>
                        <p className="text-gray-500 mt-1">
                          {doctor.willaya?.name}{doctor.commune?.name ? `, ${doctor.commune.name}` : ''}
                        </p>
                      </div>
                    </div>

                    {/* Payment info */}
                    <div className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-gray-700">Conventionné secteur 2 avec OPTAM</p>
                      </div>
                    </div>
                    
                    {/* Appointment info */}
                    <div className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-gray-700">Délai moyen: <span className="font-medium">2 jours</span></p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md mt-6 transition-colors shadow-sm">
                    PRENDRE RENDEZ-VOUS
                  </button>
                </div>
              </div>

              {/* Calendar column */}
              <div className="bg-gray-50">
                {/* Time slots grid */}
                <div className="grid grid-cols-6 gap-x-3 p-5">
                  {weekDays.slice(0, 6).map((day, dayIndex) => {
                    // Create a date object for this column
                    const columnDate = new Date(selectedDate);
                    columnDate.setDate(selectedDate.getDate() + dayIndex);
                    
                    // Check if this is today's column
                    const isToday = dayIndex === 0;
                    
                    // Get all slots for this doctor on this day
                    const bookedSlotsForDay = doctor.appointments.filter(
                      appointment => appointment.selected_date === formatDateForComparison(columnDate)
                    );
                    
                    // If no slots available for this day, show a message
                    const hasNoSlots = dayIndex === 0 || bookedSlotsForDay.length > 5;

                    return (
                      <div key={dayIndex} className="space-y-3">
                        {hasNoSlots ? (
                          // No slots available for this day
                          <div className="h-40 flex items-center justify-center">
                            <div className="text-gray-400 text-center">
                              <div className="text-lg">—</div>
                              <div className="text-xs mt-1">{isToday ? "Aucun horaire disponible aujourd'hui" : "Aucun horaire"}</div>
                            </div>
                          </div>
                        ) : (
                          // Show available time slots
                          timeSlots.map((timeSlot, slotIndex) => {
                            // Check if this specific time slot is booked
                            const isBooked = isTimeSlotBooked(
                              doctor,
                              timeSlot,
                              columnDate
                            );
                            
                            // Only show a subset of slots to match the design
                            // Show every 4th slot, plus any booked slots
                            if (slotIndex % 4 !== dayIndex % 4 && !isBooked) return null;
                            
                            return (
                              <div key={slotIndex} className="h-10">
                                {isBooked ? (
                                  <div className="flex items-center justify-center h-full">
                                    <div className="text-gray-400 text-sm">—</div>
                                  </div>
                                ) : (
                                  <button
                                    className="w-full h-full py-2 px-1 bg-blue-50 hover:bg-blue-100 rounded text-blue-700 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    onClick={() => {
                                      console.log(`Selected: ${timeSlot} with ${doctor.full_name} on ${formatDateForComparison(columnDate)}`);
                                    }}
                                  >
                                    {timeSlot}
                                  </button>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="text-center py-4 border-t">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline focus:outline-none">
                    VOIR PLUS D'HORAIRES
                  </button>
                </div>

                {/* Replacement doctor info - Only shown if applicable */}
                {doctor.id === "1" && (
                  <div className="px-5 py-4 flex items-start border-t bg-blue-50 bg-opacity-50">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 mr-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">
                      Indique une consultation assurée par un remplaçant : <span className="font-medium">Dr. Jean-Maxime Broc</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
