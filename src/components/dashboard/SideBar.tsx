"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Calendar, Stethoscope, Building, Heart, HelpCircle, Settings, LogOut, ArrowLeft } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItemsGeneral = [
    { name: "Overview", href: "/dashboard/patient", icon: Home },
    {
      name: "My Profile",
      href: "/dashboard/patient/profile",
      icon: User,
    },
  ];

  const navItemsAppointments = [
    {
      name: "My Appointments",
      href: "/dashboard/patient/appointments",
      icon: Calendar,
    },
    {
      name: "Book a Doctor",
      href: "/dashboard/patient/booking",
      icon: Stethoscope,
    },
  ];

  const navItemsExplore = [
    { name: "Clinics", href: "/dashboard/clinics", icon: Building },
    {
      name: "Health Tips",
      href: "/dashboard/patient/health-tips",
      icon: Heart,
    },
  ];

  const navItemsBottom = [
    { name: "Help", href: "/dashboard/patient/help", icon: HelpCircle },
    {
      name: "Settings",
      href: "/dashboard/patient/settings",
      icon: Settings,
    },
    {
      name: "Sign out",
      href: "/auth/signout",
      icon: LogOut,
      className: "text-red-500",
    },
  ];

  return (
    <aside className="w-64 h-screen  flex flex-col">
      <div className="p-4  border-b flex justify-between">
        <Image src="/logo.svg" alt="DoctalLink" width={120} height={35} />
        <button>
          <ArrowLeft />
        </button>
      </div>
      
      <div className="flex-1 px-4   overflow-y-auto">
        <div className="mb-6">
          <h3 className="text-[0.64rem] uppercase text-[#748191] font-aeonik font-normal mb-2">GENERAL</h3>
          {navItemsGeneral.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded mb-2 text-sm font-aeonik transition-colors ${
                pathname === item.href
                  ? "bg-white text-[#025964] "
                  : "text-[#0B0B0B] hover:bg-gray-200"
              }`}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        
      <div className="mb-6">
          <h3 className="text-[0.64rem] uppercase text-[#748191] font-aeonik font-normal mb-2">APPOINTMENTS</h3>
          {navItemsAppointments.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded mb-2 transition-colors ${
                pathname === item.href
                    ? "bg-white text-[#025964] "
                  : "text-[#0B0B0B] hover:bg-gray-200"  
              }`}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        
      <div className="">
          <h3 className="text-[0.64rem] uppercase text-[#748191] font-aeonik font-normal mb-2">EXPLORE</h3>
          {navItemsExplore.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded mb-2 transition-colors ${
                pathname === item.href
                ? "bg-white text-[#025964] "
                  : "text-[#0B0B0B] hover:bg-gray-200"
                  
              }`}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mt-auto border-t border-gray-200 p-4">
        {navItemsBottom.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 p-2 rounded mb-2 transition-colors ${
              pathname === item.href
                ? "bg-blue-600 text-white"
                : `text-gray-700 hover:bg-gray-200 ${item.className || ''}`
            }`}
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </Link>
        ))}
        <div className="text-xs text-gray-400 mt-4 text-center">
          © 2025 DoctalLink Inc.
        </div>
      </div>
    </aside>
  );
}
