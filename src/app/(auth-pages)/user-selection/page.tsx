import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import LogoLight from "../../../../public/logoLight"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default async function UserSelection() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/protected")
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-[83rem] flex rounded-xl overflow-hidden">
        {/* Left side - User Selection form */}
        <div className="w-1/2 p-12">
          <form action="/api/select-role" method="post" className="max-w-md mx-auto mt-16">
            <h1 className="text-[2.2rem] font-bold text-[#084B54]">
              Who are <span className="text-[#0AA462]">you?</span>
            </h1>
            <p className="text-sm text-[#084B54] tracking-[-0.025em] font-aeonik mb-6">
              Choose your role to continue adding to your account
            </p>

            <RadioGroup defaultValue="patient" name="role" className="space-y-4">
              <div className="flex items-center space-x-2 border border-[#ADADAD] rounded-md p-3 relative">
                <RadioGroupItem value="patient" id="patient" className="ml-2" />
                <Label htmlFor="patient" className="flex items-center gap-3 py-2 cursor-pointer w-full">
                  <div className="font-aeonik font-medium">
                    <div className="text-[#084B54] text-base">I'm a Patient</div>
                    <div className="text-xs text-[#555555]">I want to find a doctor and book an appointment</div>
                  </div>
                </Label>
                <div className="absolute right-4 bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center space-x-2 border border-[#ADADAD] rounded-md p-3">
                <RadioGroupItem value="doctor" id="doctor" className="ml-2" />
                <Label htmlFor="doctor" className="flex items-center gap-3 py-2 cursor-pointer w-full">
                  <div className="font-aeonik font-medium">
                    <div className="text-[#084B54] text-base">I'm a Doctor</div>
                    <div className="text-xs text-[#555555]">I want to manage my schedule, connect with patients</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>

            <Button className="bg-[#20504B] font-aeonik w-full h-12 text-white rounded-md mt-8" type="submit">
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
          className="w-1/2 bg-[#20504B] p-12 flex rounded-3xl flex-col gap-36"
          style={{ backgroundImage: "url('/auth.svg')" }}
        >
          <div className="mb-16">
            <LogoLight />
          </div>

          <div className="mt-auto">
            <p className="text-[1.7rem] font-aeonik font-normal text-white tracking-tight mb-8">
              "I found a specialist and booked an appointment in under 2 minutes. The process was smooth, clear, and
              stress-free!"
            </p>

            <div className="flex items-center gap-4">
              <Image src="/Avatar.png" width={50} height={50} alt="avatar" className="rounded-full" />
              <div>
                <h3 className="font-aeonik font-medium text-[1.4rem] text-white tracking-tight">Dr. Belkacem</h3>
                <h5 className="text-[0.75rem] text-white/75 tracking-tight font-aeonik font-light">
                  Tech Consultant, Algiers
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
