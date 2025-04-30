"use client";

import { useState } from "react";
import {
  Calendar,
  MapPin,
  Search,
  Heart,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations('Hero');
  
  return (
    <div
      className="relative mx-16 flex min-h-fit min-w-fit justify-between overflow-hidden rounded-[2rem] bg-cover bg-center px-16"
      style={{
        backgroundImage: `url('/hero-bg.svg'), linear-gradient(to bottom, #20504B, #426A66)`,
      }}
    >
      <div className="w-fit space-y-8 py-10">
        <Trusted />
        <Effortless />
        <Description />
        <div className="inline-flex items-center gap-2">
          <Book />
          <Button variant={"link"} className="text-[0.87rem] text-white">
            {t('doctorLink')}
          </Button>
        </div>
      </div>

      <div className="ml-14 flex w-full items-center space-y-8 py-10 pl-20">
        <CardBooking />
      </div>
    </div>
  );
}

const Trusted = () => {
  const t = useTranslations('Hero.trusted');
  return (
    <div>
      <h3 className="inline-flex items-center space-x-2 rounded-full bg-white py-1 pr-3 text-[0.8rem]">
        <span className="ml-2 rounded-full bg-[#0AA65F] px-3 py-1.5 text-white shadow-inner">
          {t('badge')}
        </span>
        <span className="font-medium tracking-[-0.025em]">{t('text')}</span>
      </h3>
    </div>
  );
};

const Effortless = () => {
  const t = useTranslations('Hero');
  return (
    <h1 className="w-full max-w-[32rem] text-[4.75rem] font-medium leading-[1] tracking-[-2px] text-white">
      {t('title')}
    </h1>
  );
};

const Description = () => {
  const t = useTranslations('Hero');
  return (
    <p className="w-[32rem] text-base leading-[1.2] tracking-[-0.025em] text-white">
      {t('description')}
    </p>
  );
};

const Book = () => {
  const t = useTranslations('Hero');
  return (
    <div className="flex items-center">
      <button className="flex items-center rounded-full bg-white p-2 tracking-tight">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00514c]">
          <ArrowUpRight className="h-4 w-4 text-white" />
        </div>
        <span className="text-aeonik px-2 text-sm">{t('bookNow')}</span>
      </button>
    </div>
  );
};

const CardBooking = () => {
  const t = useTranslations('BookingCard');
  const [specialization, setSpecialization] = useState(t('specialization.default'));
  const [location, setLocation] = useState(t('location.default'));
  const [date, setDate] = useState(t('date.default'));

  return (
    <div className="ml-auto w-full max-w-96 rounded-3xl bg-white p-8 py-6 shadow-lg rtl:!mr-auto">
      <h1 className="mb-6 text-3xl font-medium text-black">{t('title')}</h1>

      <div className="mb-4">
        <div className="relative flex items-center rounded-lg border border-gray-200 p-3">
          <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-teal-800 text-white">
            <Heart size={16} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500">{t('specialization.label')}</p>
            <div className="flex items-center justify-between">
              <p className="font-regular text-sm">{specialization}</p>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative flex items-center rounded-lg border border-gray-200 p-3">
          <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full border-[1px] border-teal-800 text-teal-800">
            <MapPin size={16} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500">{t('location.label')}</p>
            <div className="flex items-center justify-between">
              <p className="font-regular text-sm">{location}</p>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative flex items-center rounded-lg border border-gray-200 p-3">
          <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full border-[1px] border-teal-800 text-teal-800">
            <Calendar size={16} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500">{t('date.label')}</p>
            <div className="flex items-center justify-between">
              <p className="font-regular text-sm">{date}</p>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      <button className="flex w-full items-center justify-center rounded-lg bg-teal-800 px-4 py-3 text-white hover:bg-teal-900">
        <Search size={16} className="mr-2" />
        <span>{t('searchButton')}</span>
      </button>
    </div>
  );
};
