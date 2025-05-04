"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface UserProfileProps {
  name?: string;
  email?: string;
  initials?: string;
}

function UserProfile({ 
  name = "Chorfi Fady", 
  email = "you@example.com", 
  initials = "CF" 
}: UserProfileProps) {
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-0 hover:bg-transparent flex items-center gap-3 group">
          <div className="flex items-center justify-center h-9 w-9 rounded-full bg-[#013238] text-white">
            <p className="text-xs font-medium">{initials}</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="font-aeonik text-sm tracking-tight text-[#013238] leading-tight">{name}</p>
            <p className="font-aeonik text-xs tracking-tight text-[#748191] leading-tight">{email}</p>
          </div>
          <ChevronDown size={16} className="text-gray-400 ml-1 group-hover:text-gray-600 transition-colors" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mt-1">
        <div className="px-2 py-1.5 text-sm font-medium text-gray-500">My Account</div>
        <DropdownMenuItem className="cursor-pointer">
          <User size={16} className="mr-2" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings size={16} className="mr-2" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
          <LogOut size={16} className="mr-2" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfile;