"use client";

import * as React from "react";
import Link from "next/link";
import Logo from "../../public/logo";
import GetStartedButton from "./btn-register";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Video, FileText, Calendar, PillBottle, Activity } from "lucide-react";

// Service items with their details
const services = [
  {
    title: "Teleconsultation",
    href: "/services/teleconsultation",
    description: "Connect with healthcare professionals remotely for consultations.",
    icon: <Video className="h-4 w-4" color="#20504B" />,
  },
  {
    title: "Medical Records",
    href: "/services/medical-records",
    description: "Securely store and access your medical history and test results.",
    icon: <FileText className="h-4 w-4" color="#20504B" />,
  },
  {
    title: "Appointment Booking",
    href: "/services/appointment-booking",
    description: "Schedule appointments with doctors at your convenience.",
    icon: <Calendar className="h-4 w-4" color="#20504B" />,
  },
  {
    title: "Prescription Refills",
    href: "/services/prescription-refills",
    description: "Request and manage prescription refills online.",
    icon: <PillBottle className="h-4 w-4" color="#20504B" />,
  },
  {
    title: "Health Monitoring",
    href: "/services/health-monitoring",
    description: "Track your vital signs and health metrics.",
    icon: <Activity className="h-4 w-4" color="#20504B" />,
  },
];

// Interface for ListItem props
interface ListItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

// ListItem component for service dropdown
const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, icon, ...props }, ref) => (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block space-y-1 rounded-md py-3 px-4 leading-none no-underline transition-colors hover:text-[#20504B] hover:bg-[#20504B] hover:bg-opacity-5",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            {icon} {title}
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  ),
);
ListItem.displayName = "ListItem";

const Navbar = () => {
  return (
    <nav className="flex w-full max-w-none items-center justify-between px-16 py-6 font-aeonik text-black">
      <Logo />

      <NavigationMenu>
        <NavigationMenuList>
          {/* Home Link */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/">
                <div
                  className={cn(navigationMenuTriggerStyle(), "font-normal hover:text-[#20504B]")}
                >
                  Home
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Services Dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-normal hover:text-[#20504B]">
              Services
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {services.map((service) => (
                  <ListItem
                    key={service.title}
                    title={service.title}
                    href={service.href}
                    icon={service.icon}
                  >
                    {service.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Static Nav Links */}
          {["About Us", "Contact", "FAQ"].map((item) => (
            <NavigationMenuItem key={item}>
              <NavigationMenuLink asChild>
                <Link href={`/${item.toLowerCase().replace(" ", "")}`}>
                  <div
                    className={cn(navigationMenuTriggerStyle(), "font-normal hover:text-[#20504B]")}
                  >
                    {item}
                  </div>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* CTA Section */}
      <div className="flex items-center gap-4">
        <Link href="/sign-in" className="text-base hover:text-[#20504B]">
          Sign In
        </Link>
        <GetStartedButton />
      </div>
    </nav>
  );
};

export default Navbar;
