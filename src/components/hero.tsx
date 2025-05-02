"use client";

import { useState } from "react";
import { Calendar, MapPin, Search, Heart, ChevronDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const HeroContent = () => {
  const t = useTranslations("Hero");

  return (
    <div className="w-full space-y-4 text-center md:text-center lg:text-left lg:w-fit lg:space-y-8">
      <div className="flex justify-center md:justify-center lg:justify-start">
        <h3 className="inline-flex items-center space-x-2 rounded-full bg-white py-1 pr-3 text-[0.7rem] md:text-[0.8rem]">
          <span className="ml-2 rounded-full bg-[#0AA65F] px-2 py-1 text-white shadow-inner md:px-3 md:py-1.5">
            {t("trusted.badge")}
          </span>
          <span className="tracking-[-0.025em]">{t("trusted.text")}</span>
        </h3>
      </div>

      <div className="flex flex-col gap-2 lg:gap-3">
        <h1 className="w-full text-3xl font-medium leading-[1.1] tracking-[-0.075rem] text-white md:w-full md:text-4xl lg:w-[28rem] lg:text-5xl lg:leading-[1] lg:tracking-[-0.125rem] xl:w-[32rem] xl:text-[4.875rem]">
          {t("title")}
        </h1>
        <p className="w-full text-sm leading-[1.3] tracking-[-0.025rem] text-white md:w-full md:text-base md:leading-[1.2] lg:w-[28rem] xl:w-[32rem]">
          {t("description")}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center md:justify-center lg:justify-start gap-3 lg:gap-2">
        <div className="flex items-center">
          <Link href="/sign-in">
            <button className="flex items-center rounded-full bg-white p-1.5 tracking-tight md:p-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00514c] md:h-8 md:w-8">
                <ArrowUpRight className="h-3 w-3 text-white md:h-4 md:w-4" />
              </div>
              <span className="text-aeonik px-2 text-xs md:text-sm">{t("bookNow")}</span>
            </button>
          </Link>
        </div>
        <Link href="/sign-up/doctor">
          <Button
            variant={"link"}
            className="h-auto p-0 text-[0.8rem] text-white md:text-[0.87rem]"
          >
            {t("doctorLink")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

const AppointmentBookingCard = () => {
  const t = useTranslations("BookingCard");
  const [specialization, setSpecialization] = useState(t("specialization.default"));
  const [location, setLocation] = useState(t("location.default"));
  const [date, setDate] = useState(t("date.default"));

  return (
    <div className="w-full max-w-full rounded-2xl bg-white p-5 py-5 shadow-lg md:max-w-[360px] md:rounded-3xl md:p-6 md:py-6 lg:max-w-96 lg:p-8">
      <h1 className="mb-4 text-2xl font-medium text-black md:mb-6 md:text-3xl">{t("title")}</h1>

      <div className="mb-3 md:mb-4">
        <div className="relative flex items-center rounded-lg border border-gray-200 p-2 md:p-3">
          <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-teal-800 text-white md:mr-3 md:h-9 md:w-9">
            <Heart className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-gray-500 md:text-xs">{t("specialization.label")}</p>
            <div className="flex items-center justify-between">
              <p className="font-regular text-xs md:text-sm">{specialization}</p>
              <ChevronDown className="h-3 w-3 text-gray-500 md:h-4 md:w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3 md:mb-4">
        <div className="relative flex items-center rounded-lg border border-gray-200 p-2 md:p-3">
          <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full border-[1px] border-teal-800 text-teal-800 md:mr-3 md:h-9 md:w-9">
            <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-gray-500 md:text-xs">{t("location.label")}</p>
            <div className="flex items-center justify-between">
              <p className="font-regular text-xs md:text-sm">{location}</p>
              <ChevronDown className="h-3 w-3 text-gray-500 md:h-4 md:w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 md:mb-6">
        <div className="relative flex items-center rounded-lg border border-gray-200 p-2 md:p-3">
          <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full border-[1px] border-teal-800 text-teal-800 md:mr-3 md:h-9 md:w-9">
            <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-gray-500 md:text-xs">{t("date.label")}</p>
            <div className="flex items-center justify-between">
              <p className="font-regular text-xs md:text-sm">{date}</p>
              <ChevronDown className="h-3 w-3 text-gray-500 md:h-4 md:w-4" />
            </div>
          </div>
        </div>
      </div>

      <button className="flex w-full items-center justify-center rounded-lg bg-teal-800 px-3 py-2.5 text-white hover:bg-teal-900 md:px-4 md:py-3">
        <Search className="h-3.5 w-3.5 mr-1.5 md:mr-2 md:h-4 md:w-4" />
        <span className="text-sm md:text-base">{t("searchButton")}</span>
      </button>
    </div>
  );
};

export default function Hero() {
  return (
    <div
      className="relative flex min-h-fit min-w-fit flex-col items-center md:items-center lg:items-stretch gap-8 overflow-hidden rounded-xl bg-cover bg-center px-[10%] py-6 md:rounded-2xl md:px-[10%] md:py-8 lg:flex-row lg:gap-0 lg:rounded-[2rem] lg:px-12 lg:py-10 xl:px-16"
      style={{
        backgroundImage: "url('/hero-bg.svg'), linear-gradient(to bottom, #20504B, #426A66)",
      }}
    >
      <HeroContent />
      <div
        className={cn(
          "hidden w-full lg:flex lg:items-center lg:justify-end",
          "lg:ml-0 lg:pl-0 xl:ml-4 xl:pl-10 2xl:ml-14 2xl:pl-20",
        )}
      >
        <AppointmentBookingCard />
      </div>
    </div>
  );
}
