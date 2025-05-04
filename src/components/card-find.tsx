import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "./ui/button";
import { Heart, MapPin, MoreVertical } from "lucide-react";

type Doctor = {
  id: string;
  full_name: string;
  specialty: string;
  location: string;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
};

const Cardfind = ({ doctor }: { doctor: any }) => {
    return (
      <div className="flex w-full max-w-sm items-center gap-4 rounded-xl border bg-white p-4 shadow-md">
        <Image
          src="/doctor-card.png"
          alt="Doctor Image"
          width={120}
          height={120}
          className="rounded-lg object-cover"
        />
  
        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between">
            <p className="text-base font-aeonik tracking-tight font-medium text-[#013238]">
              {doctor.full_name}
            </p>
            <Button size="icon" variant="ghost" className="text-gray-400">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
  
          <div className="flex items-center gap-2 text-base font-aeonik tracking-tight font-medium text-[#013238]">
            <Heart className="h-4 w-4" />
            <span>{doctor.specialty?.name}</span>
          </div>
  
          <div className="mt-1 flex items-center gap-2 text-base font-aeonik tracking-tight font-medium text-[#013238]">
            <MapPin className="h-4 w-4" />
            <span>{doctor.willaya?.name}</span>
          </div>
  
          <div className="mt-1 flex items-center gap-2 text-base font-aeonik tracking-tight font-medium text-[#013238]">
            <FaStar className="h-4 w-4 text-[#0AA462]" />
            <span className="font-aeonik">4.9</span>
            <span className="text-[#748191]">(10 reviews)</span>
          </div>
        </div>
      </div>
    );
  };
  

export default Cardfind;
