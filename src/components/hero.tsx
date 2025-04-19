"use client";

import { useState } from "react";
import { Calendar, MapPin, Search, Heart } from "lucide-react";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div
      className="px-16 mx-16 flex justify-between  min-h-fit min-w-fit  bg-cover bg-center rounded-[2rem] overflow-hidden relative"
      style={{ backgroundImage: "url('/hero-bg.svg')" }}>

      <div className=" w-fit py-10 space-y-8 ">
        <Trusted />
        <Effortless />
        <Description />
        <div className="inline-flex items-center gap-2">
          <Book />
          <Button variant={"link"} className="text-white text-[0.87rem] font-aeonik " >
                I'm a Doctor
          </Button>
        </div>
      </div>

      <div className=" flex items-center   w-full py-10  ml-14 pl-20 space-y-8 ">
        <CardBooking />
      </div>

    </div>
  );
}

const Trusted = () => {
  return (
    <div>
      <h3 className="bg-white rounded-full py-1 pr-3 text-[0.8rem]  space-x-2 inline-flex items-center">
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
    <h1 className="text-[4.5rem] w-[32rem]  leading-[1] text-white  ">
      Effortless Scheduling for Better Care
    </h1>
  );
};

const Description = () => {
  return (
    <p className="text-white text-[1rem] w-[32rem] leading-[1.2]   tracking-[-0.025em]  ">
      Discover reliable healthcare professionals, check open times instantly,
      and manage your visits with ease. Designed to make your health journey
      smoother from start to finish.
    </p>
  );
};

const Book = () => {
  return (
    <div className="flex  items-center ">
      <button className="flex items-center bg-white rounded-full p-2 tracking-tight">
        <div className="flex justify-center items-center w-8 h-8 bg-[#00514c] rounded-full">
          <svg
            className="w-4 h-4 text-white"
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
        <span className="text-sm text-aeonik px-2">Book Now</span>
      </button>
    </div>
  );
};
           
const CardBooking = () => {
  const [specialization, setSpecialization] = useState("Cardiology");
  const [location, setLocation] = useState("Tebessa, Algeria");
  const [date, setDate] = useState("12 Apr 2025");

  return (
      <div className="w-full bg-white rounded-3xl shadow-lg py-4 px-6">
        <h1 className="text-2xl  text-black mb-6">Book Appointment</h1>

        <div className="mb-4">
          <div className="relative border border-gray-200 rounded-lg p-3 flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-teal-800 text-white rounded-full mr-3">
              <Heart size={18} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Specialization</p>
              <div className="flex items-center justify-between">
                <p >{specialization}</p>
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative border border-gray-200 rounded-lg p-3 flex items-center">
            <div className="flex items-center justify-center w-8 h-8 border-2 border-teal-800 text-teal-800 rounded-full mr-3">
              <MapPin size={18} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Location</p>
              <div className="flex items-center justify-between">
                <p className="font-medium">{location}</p>
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative border border-gray-200 rounded-lg p-3 flex items-center">
            <div className="flex items-center justify-center w-8 h-8 border-2 border-teal-800 text-teal-800 rounded-full mr-3">
              <Calendar size={18} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Date</p>
              <div className="flex items-center justify-between">
                <p className="font-medium">{date}</p>
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full bg-teal-800 hover:bg-teal-900 text-white py-3 px-4 rounded-lg flex items-center justify-center">
          <Search size={20} className="mr-2" />
          <span>Search</span>
        </button>
      </div>
  );
};
