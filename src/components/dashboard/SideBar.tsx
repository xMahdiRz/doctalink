"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Calendar,
  Stethoscope,
  Building,
  Heart,
  HelpCircle,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { Button } from "../ui/button";

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
    <aside className="flex  w-64 flex-col px-4 py-6">
      <div className="mb-4 flex justify-between border-b pb-4">
        <Image src="/logo-dashboard-patient.svg" alt="DoctalLink" width={120} height={35} />
        <Button size={"icon"} variant={"outline"}>
          <ArrowLeft />
        </Button>
      </div>

      <div className="">
        <div className="mb-4">
          <h3 className="mb-2 font-aeonik text-xs uppercase text-[#748191]">GENERAL</h3>
          {navItemsGeneral.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`mb-2 flex items-center gap-3 rounded p-2 font-aeonik text-sm transition-colors ${
                pathname === item.href
                  ? "bg-white text-[#025964]"
                  : "text-[#0B0B0B] hover:bg-gray-200"
              }`}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="mb-2 font-aeonik text-[0.64rem] uppercase text-[#748191]">APPOINTMENTS</h3>
          {navItemsAppointments.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`mb-2 flex items-center gap-3 rounded p-2 font-aeonik text-sm transition-colors ${
                pathname === item.href
                  ? "bg-white text-[#025964]"
                  : "text-[#0B0B0B] hover:bg-gray-200"
              }`}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="mb-2 font-aeonik text-[0.64rem] uppercase text-[#748191]">EXPLORE</h3>
          {navItemsExplore.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`mb-2 flex items-center gap-3 rounded p-2 font-aeonik text-sm transition-colors ${
                pathname === item.href
                  ? "bg-white text-[#025964]"
                  : "text-[#0B0B0B] hover:bg-gray-200"
              }`}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className=" ">
        {navItemsBottom.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`mb-2 flex items-center gap-3 rounded p-2 font-aeonik text-sm transition-colors${
              pathname === item.href
                ? "bg-blue-600 text-white"
                : `text-gray-700 hover:bg-gray-200 ${item.className || ""}`
            }`}
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </Link>
        ))}
        <div className="mt-4 text-center text-xs text-gray-400">© 2025 DoctalLink Inc.</div>
      </div>
    </aside>
  );
}
