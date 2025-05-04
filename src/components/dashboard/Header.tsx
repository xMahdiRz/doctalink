"use client";

import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "../theme-switcher";
import { Button } from "../ui/button";
import { Bell, Sun } from "lucide-react";
import Cf from "../Cf";
import UserProfile from "../UserProfile";

export default function Header() {
  const pathname = usePathname();
  const title = pathname.split("/").pop();

  return (
    <header className="font-aeoni flex items-center justify-between px-8 py-5 text-xl shadow">
      <div className="h-fit place-content-center text-sm">
        <h3 className="font-aeonik tracking-tight text-[#748191]">
          DoctoLink <span className="font-aeonik tracking-tight  text-[#013238]">{" > "}book a Doctor</span>
        </h3>
      </div>

      <div className="flex items-center gap-6">
        <Button variant={"outline"} size={"icon"}>
          <Sun />
        </Button>
        <Button variant={"outline"} size={"icon"}>
          <Bell className="text-black" size={56} />
        </Button>

        <UserProfile />
      </div>
    </header>
  );
}
