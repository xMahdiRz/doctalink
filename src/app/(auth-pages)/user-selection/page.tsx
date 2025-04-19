import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoLight from "../../../../public/logoLight";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Stethoscope, User } from "lucide-react"
import { Button } from "@/components/ui/button";

const roles = [
  {
    id: "patient",
    label: "I'm a Patient",
    description: "Book doctor appointments and manage your visits easily.",
    icon: <User className="w-6 h-6" />,
  },
  {
    id: "doctor",
    label: "I'm a Doctor",
    description: "Manage appointments, availability & connect with patients.",
    icon: <Stethoscope className="w-6 h-6" />,
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
    <main className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-[83rem] flex rounded-xl overflow-hidden">
        {/* Left side - User Selection form */}
        <div className="w-1/2 p-12">
          <form
            action="/api/select-role"
            method="post"
            className="max-w-md mx-auto mt-16"
          >
            <h1 className="text-[2.2rem] font-aeonik font-bold text-[#084B54]">
              Who are <span className="text-[#0AA462]">you?</span>
            </h1>
            <p className="text-sm text-[#084B54] tracking-[-0.025em] font-aeonik mb-6">
              Choose your role to continue adding to your account
            </p>

            <RadioGroup
              name="role"
              defaultValue="patient"
              className="space-y-4"
            >
              {roles.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-center border rounded-2xl p-3 relative w-full  border-[#D9D9D9]"
                >
                  <div className="border border-[#D9D9D9] rounded-xl w-10 h-10 flex items-center justify-center">
                    {item.icon}
                  </div>

                  <Label
                    htmlFor={item.id}
                    className="flex items-center justify-between w-full cursor-pointer"
                  >
                    <div className="flex flex-col font-aeonik font-medium">
                      <div className="text-[#084B54] text-base">
                        {item.label}
                      </div>
                      <div className="text-xs text-[#555555]">
                        {item.description}
                      </div>
                    </div>
                    <RadioGroupItem
                      value={item.id}
                      id={item.id}
                      className="ml-4 border-0   "
                    />
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button
              className="bg-[#20504B] font-aeonik w-full h-12 text-white rounded-md mt-8"
              type="submit"
            >
              Continue
            </Button>
          </form>

          <div className="text-center mt-8">
            <p className="text-[#555555] text-xs">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              ,<br />
              and that cookies collection is used to improve your experience.
            </p>
          </div>
        </div>

        {/* Right side - Testimonial */}
        <div
          className="w-1/2 bg-[#20504B] p-12 flex rounded-3xl flex-col gap-36 min-h-[38rem] "
          style={{ backgroundImage: "url('/auth.svg')" }}
        >
          <div className="mb-16">
            <LogoLight />
          </div>

          <div className="mt-auto">
            <p className="text-[1.7rem] font-aeonik font-normal text-white tracking-tight mb-8">
              "I found a specialist and booked an appointment in under 2
              minutes. The process was smooth, clear, and stress-free!"
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
                <h3 className="font-aeonik font-medium text-[1.4rem] text-white tracking-tight">
                  Dr. Belkacem
                </h3>
                <h5 className="text-[0.75rem] text-white/75 tracking-tight font-aeonik font-light">
                  Tech Consultant, Algiers
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
