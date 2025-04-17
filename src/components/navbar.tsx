"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Logo from "../../public/logo";
import Link from "next/link";
import GetStartedButton from "./btn-register";

type NavitemProps = {
  name: string;
  link: string;
};

type CtaProps = {
  name: string;
  link: string;
};

const navItems: NavitemProps[] = [
  { name: "Home", link: "/" },
  { name: "Service", link: "/service" },
  { name: "About Us", link: "/about" },
  { name: "Contact", link: "/contact" },
  { name: "FAQ", link: "/faq" },
];

const CtaItems: CtaProps[] = [
  { name: "Sign In", link: "/sign-in" },
  { name: "Get Started", link: "/register" },
];

const Navbar = () => {

  

  return (
    <nav className="flex justify-between px-16 py-6 w-full  font-aeonik text-black">
      <div>
        <Logo />
      </div>

      <div>
        <ul className="flex items-center gap-8">
          {navItems.map((item, index) =>
            item.name === "Service" ? (
              <ServiceItem key={index} />
            ) : (
              <Link
                href={item.link}
                key={index}
                className="text-[1rem] tracking-[3%] font-aeonik hover:text-[#20504B]"
              >
                {item.name}
              </Link>
            )
          )}
        </ul>
      </div>

      <div>
        <ul className="flex gap-4 items-center">
          {CtaItems.map((item, index) =>
            item.name === "Get Started" ? (
                <GetStartedButton key={index} />
            ) : (
              <Link
                href={item.link}
                key={index}
                className="text-[1rem] font-medium hover:text-[#20504B]"
              >
                {item.name}
              </Link>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

export function ServiceItem() {
  return (
    <Select>
      <SelectTrigger className="w-fit">
        <SelectValue
          placeholder="Service"
          className="hover:text-[#20504B] text-black"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
