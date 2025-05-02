import React from "react";
import Navbar from "./navbar";
import Hero from "./hero";

const Header = () => {
  return (
    <div className="flex min-h-screen w-full flex-col gap-4 px-4 pb-8 pt-4 sm:px-6 md:gap-6 md:px-10 md:pb-12 md:pt-6 lg:px-14">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Header;
