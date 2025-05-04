"use client";

import { usePathname } from "next/navigation";
import { Bell, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import UserProfile from "./UserProfile";



export default function Header() {
  const pathname = usePathname();
  const title = pathname.split("/").pop();

  // Format the path for breadcrumb display
  const formattedTitle = title ? title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, ' ') : 'Dashboard';

  return (
    <header className="flex justify-between items-center px-8 h-16 border-b text-xl font-aeonik">
      <div className="h-fit flex items-center">
        <h3 className="font-aeonik text-[#748191] tracking-tight">
          DoctoLink
          <span className="font-aeonik text-[#013238] tracking-tight">
            {" > "}  {formattedTitle}
          </span>
        </h3>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                  <Sun className="text-gray-600" size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="relative rounded-full h-10 w-10" size="icon">
                  <Bell className="text-gray-600" size={20} />
                  <span className="absolute top-2 right-2 h-2 w-2 bg-red-600 rounded-full ring-2 ring-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        
      </div>
    </header>
  );
}