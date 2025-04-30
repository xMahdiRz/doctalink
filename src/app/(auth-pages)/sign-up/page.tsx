import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Stethoscope, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = [
  {
    id: "patient",
    label: "I'm a Patient",
    description: "Book doctor appointments and manage your visits easily.",
    icon: <User className="h-6 w-6 text-[#023B42]" />,
  },
  {
    id: "doctor",
    label: "I'm a Doctor",
    description: "Manage appointments, availability & connect with patients.",
    icon: <Stethoscope className="h-6 w-6 text-[#023B42]" />,
  },
];

export default async function UserSelection() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/protected");
  }

  return (
    <main className="flex h-screen items-center justify-center bg-white p-6">
      {/* Left side - User Selection form */}
      <div className="flex h-full w-full flex-col items-center justify-center px-24 py-14">
        <form action="/api/select-role" method="post" className="w-full">
          <h1 className="font-aeonik text-[2.2rem] font-bold text-[#084B54]">
            Who are <span className="text-[#0AA462]">you?</span>
          </h1>
          <p className="mb-4 font-aeonik text-sm tracking-[-0.025em] text-[#444444]">
            Choose your role to continue adding to your account
          </p>

          <RadioGroup name="role" defaultValue="patient" className="!gap-3">
            {roles.map((item, index) => (
              <div key={index} className="relative">
                <div className="group">
                  <Label
                    htmlFor={item.id}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-[#D9D9D9] p-3 has-[input:checked]:border-[#023B42]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D9D9D9] p-2.5">
                      {item.icon}
                    </div>
                    <div className="flex w-full items-start justify-between">
                      <div className="flex flex-col font-aeonik font-medium">
                        <div className="text-base tracking-tight text-[#084B54]">
                          {item.label}
                        </div>
                        <div className="text-xs font-normal tracking-tight text-[#555555]">
                          {item.description}
                        </div>
                      </div>
                      <RadioGroupItem
                        value={item.id}
                        id={item.id}
                        className="ml-4 border-[#D9D9D9] data-[state=checked]:border-[#023B42] data-[state=checked]:bg-[#023B42]"
                      />
                    </div>
                  </Label>
                </div>
              </div>
            ))}
          </RadioGroup>

          <Button
            className="mt-4 h-12 w-full rounded-md bg-[#20504B] font-aeonik text-white transition-colors duration-200 hover:bg-[#2a6a64]"
            type="submit"
          >
            Continue
          </Button>
        </form>
      </div>

      <div className="flex h-full w-full flex-col justify-between rounded-3xl bg-[#20504B] bg-[url('/auth.svg')] bg-cover bg-center px-20 py-14">
        <Image src="/logoLight.svg" width={151} height={43} alt="logo" />

        <div className="">
          <p className="mb-8 font-aeonik text-[1.7rem] font-normal tracking-tight text-white">
            "I found a specialist and booked an appointment in under 2 minutes.
            The process was smooth, clear, and stress-free!"
          </p>

          <div className="flex items-center gap-4">
            <Image
              src="/Avatar.png"
              width={50}
              height={50}
              alt="avatar"
              className="rounded-full"
            />
            <div>
              <h3 className="font-aeonik text-[1.4rem] font-medium tracking-tight text-white">
                Dr. Belkacem
              </h3>
              <h5 className="font-aeonik text-[0.75rem] font-light tracking-tight text-white/75">
                Tech Consultant, Algiers
              </h5>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
