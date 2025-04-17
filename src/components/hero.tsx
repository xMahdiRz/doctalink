"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div
      className="px-16 mx-16 min-h-fit min-w-fit  bg-cover bg-center rounded-[2rem] overflow-hidden relative"
      style={{ backgroundImage: "url('/hero-bg.svg')" }}
    >
      <div className=" w-fit py-10 space-y-8">
        <Trusted />
        <Effortless />
        <Description />
        <Book />
      </div>
    </div>
  );
}

const Trusted = () => {
  return (
    <div>
      <h3 className="bg-white rounded-full py-1 pr-3 text-[0.8rem] font-aeonik space-x-2 inline-flex items-center">
        <span className="bg-[#0AA65F] rounded-full text-white py-1.5 px-3 ml-2 shadow-inner">
          Trusted
        </span>
        <span>Best Medical Service in Algeria</span>
      </h3>
    </div>
  );
};

const Effortless = () => {
  return (
    <h1 className="text-[4.875rem] w-[32rem]  leading-[1] text-white font-aeonik ">
      Effortless Scheduling for Better Care
    </h1>
  );
};

const Description = () => {
  return (
    <p className="text-white text-[1rem] w-[32rem] leading-[1.2]  font-aeonik tracking-[-0.025em]  ">
      Discover reliable healthcare professionals, check open times instantly,
      and manage your visits with ease. Designed to make your health journey
      smoother from start to finish.
    </p>
  );
};

function Book() {
  return (
    <div className="flex  items-center ">
      <button className="flex items-center bg-white rounded-full p-2 ">
        <div className="flex justify-center items-center w-14 h-14 bg-[#00514c] rounded-full">
          <svg 
            className="w-6 h-6 text-white" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M7 17L17 7M17 7H7M17 7V17" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-xl font-medium text-black pr-10 pl-5">Book Now</span>
      </button>
    </div>
  );
}
