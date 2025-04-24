"use client"

import { useState } from "react"
import { format, addDays } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Appointment = {
  selected_time: string | null
  selected_date: string | null
}

type AppointmentCalendarProps = {
  appointments: Appointment[]
  onSelectTimeSlot?: (time: string, date: string) => void
}

export function AppointmentCalendar({ appointments, onSelectTimeSlot }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Generate time slots from 8:00 to 16:00 in 30-minute increments
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour < 16; hour++) {
      for (const minute of [0, 30]) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        slots.push(timeString)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  // Format date to YYYY-MM-DD for comparison with appointment dates
  const formattedDate = format(currentDate, "yyyy-MM-dd")

  // Update the isTimeSlotBooked function to handle potential format differences
  const isTimeSlotBooked = (time: string) => {
    console.log("Checking time slot:", time, "for date:", formattedDate)
    console.log("Available appointments:", appointments)

    return appointments.some((appointment) => {
      // Skip null appointments
      if (!appointment.selected_time || !appointment.selected_date) {
        return false
      }

      // Normalize time format (in case there are format differences)
      const appointmentTime = appointment.selected_time.trim()

      // Normalize date format (in case Supabase returns a different format)
      // Convert both to YYYY-MM-DD for comparison
      let appointmentDate = appointment.selected_date
      try {
        // If the date is in a different format, try to standardize it
        if (appointmentDate.includes("T") || appointmentDate.includes("/")) {
          appointmentDate = new Date(appointmentDate).toISOString().split("T")[0]
        }
      } catch (e) {
        console.error("Error parsing date:", e)
      }

      console.log(`Comparing: [${appointmentTime}==${time}] and [${appointmentDate}==${formattedDate}]`)

      return appointmentTime === time && appointmentDate === formattedDate
    })
  }

  // Navigate to previous/next day
  const goToPreviousDay = () => setCurrentDate((prev) => addDays(prev, -1))
  const goToNextDay = () => setCurrentDate((prev) => addDays(prev, 1))

  // Handle time slot selection
  const handleTimeSlotClick = (time: string) => {
    if (!isTimeSlotBooked(time) && onSelectTimeSlot) {
      onSelectTimeSlot(time, formattedDate)
    }
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="icon" onClick={goToPreviousDay}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-medium">{format(currentDate, "EEEE, MMMM d, yyyy")}</h3>
        <Button variant="outline" size="icon" onClick={goToNextDay}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-4 md:grid-cols-8">
        {timeSlots.map((time) => {
          const isBooked = isTimeSlotBooked(time)
          return (
            <button
              key={time}
              onClick={() => handleTimeSlotClick(time)}
              disabled={isBooked}
              className={`
                p-2 rounded text-center text-sm
                ${
                  isBooked
                    ? "bg-gray-100 text-gray-400"
                    : "bg-green-50 text-green-700 hover:bg-green-100 cursor-pointer"
                }
              `}
            >
              {isBooked ? "-" : time}
            </button>
          )
        })}
      </div>
    </div>
  )
}
