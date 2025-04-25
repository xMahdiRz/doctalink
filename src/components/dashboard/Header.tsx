"use client";

import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "../theme-switcher";
import { Button } from "../ui/button";
import { Bell, Sun } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const title = pathname.split("/").pop();

  return (
    <header className=" flex justify-between px-8 shadow text-xl font-aeonik">
      <div className="py-4">
        <h3 className="font-aeonik text-[#748191] tracking-tight">
          DoctoLink 
          <span className="font-aeonik text-[#013238] tracking-tight">
            {" > "}  book a Doctor
          </span>
        </h3>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex  items-center gap-6">
          <Sun />
          <Button className="bg-transparent relative h-12 w-12" size={"icon"}>
            <Bell className="text-black" size={40} />
            <div className="absolute top-4 right-4 h-2 w-2 bg-red-600 rounded-full"></div>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className=" p-3 rounded-full bg-[#013238]  ">
            <p className="text-xs  text-white font-aeonik  ">CF</p>
          </div>
            <div>
              <div>
                <p className="text-[#013238] text-sm font-aeonik tracking-tight ">Chorfi Fady</p>
                <p className="text-[#748191] text-xs font-aeonik tracking-tight ">you@example.com</p>
              </div>
            </div>
        </div>
      </div>
    </header>
  );
}
