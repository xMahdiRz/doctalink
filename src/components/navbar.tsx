"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
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
import { Video, FileText, Calendar, PillBottle, Activity, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";

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

const navItems = ["Home", "Services", "About Us", "Contact", "FAQ"];

interface ListItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, icon, ...props }, ref) => (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block space-y-1 rounded-md px-4 py-3 leading-none no-underline transition-colors hover:bg-[#20504B] hover:bg-opacity-5 hover:text-[#20504B]",
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
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="flex w-full max-w-none items-center justify-between font-aeonik text-black">
      {/* Logo - always visible */}
      <Link href="/">
        <Image
          src="/logo.svg"
          width={149}
          height={27}
          alt="logo"
          priority
          className="z-10 h-auto w-[149px]"
        />
      </Link>

      {/* Desktop Navigation - hidden on mobile */}
      <div className="hidden lg:block">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item}>
                {item === "Services" ? (
                  // Services Dropdown
                  <>
                    <NavigationMenuTrigger className="text-base font-normal hover:text-[#20504B]">
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 lg:w-[500px] lg:grid-cols-2 xl:w-[600px]">
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
                  </>
                ) : (
                  // Regular Nav Links
                  <NavigationMenuLink asChild>
                    <Link href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}>
                      <div
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-base font-normal hover:text-[#20504B]",
                        )}
                      >
                        {item}
                      </div>
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Desktop CTA Section - hidden on mobile */}
      <div className="hidden items-center gap-4 lg:flex">
        <Link href="/sign-in" className="text-base hover:text-[#20504B]">
          Sign In
        </Link>
        <GetStartedButton />
      </div>

      {/* Mobile Menu Button - visible only on mobile */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="h-10 w-10 text-teal-800">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[85%] bg-white p-0 pr-0 md:w-[385px]">
          <div className="flex h-full flex-col">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-3">
                <Image src="/logo.svg" width={120} height={22} alt="logo" />
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </div>

              <SheetClose />
            </div>

            {/* Mobile Menu Items */}
            <div className="flex flex-grow flex-col space-y-4 overflow-auto p-4">
              {navItems.map((item) => (
                <div key={item} className="border-b pb-3">
                  {item === "Services" ? (
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium text-teal-800">Services</h3>
                      <div className="space-y-3 pl-2">
                        {services.map((service) => (
                          <Link
                            key={service.title}
                            href={service.href}
                            className="flex items-center gap-2 text-sm hover:text-teal-800"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="flex-shrink-0">{service.icon}</div>
                            <span>{service.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}
                      className="text-lg font-medium hover:text-teal-800"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile CTA Section */}
            <div className="mt-auto border-t p-4">
              <div className="flex flex-col gap-3">
                <Link
                  href="/sign-in"
                  className="w-full rounded-lg border border-teal-800 py-2 text-center text-teal-800 transition-colors hover:bg-teal-50"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="w-full rounded-lg bg-teal-800 py-2 text-center text-white transition-colors hover:bg-teal-700"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
