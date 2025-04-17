import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormMessage, type Message } from "@/components/form-message"
import { SubmitButton } from "@/components/submit-button"
import LogoLight from "../../../../../public/logoLight"

export default async function DoctorSignUp({ searchParams }: { searchParams: Promise<Message> }) {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/protected")
  }

  const message = await searchParams

  return (
    <main className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-[83rem] flex rounded-xl overflow-hidden">
        {/* Left side - Signup form */}
        <div className="w-1/2 p-12">
          <form className="max-w-md mx-auto mt-8">
            <h1 className="text-[1.8rem] font-bold text-[#084B54] mb-1">
              Hey <span className="text-[#0AA462]">Doctor</span>!
            </h1>
            <p className="text-sm text-[#555555] tracking-[-0.025em] font-aeonik mb-6">
              Fill out this form to join our network of providers
            </p>

            <div className="flex flex-col gap-1 mb-4">
              <Label htmlFor="email" className="text-[#084B54] text-[0.87rem] font-aeonik font-normal">
                Email
              </Label>
              <Input
                name="email"
                type="email"
                placeholder="doctor@example.com"
                required
                className="bg-white text-black border-[#ADADAD] h-12"
              />
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <Label htmlFor="medicalId" className="text-[#084B54] text-[0.87rem] font-aeonik font-normal">
                Medical License ID
              </Label>
              <Input
                name="medicalId"
                placeholder="Your medical license number"
                required
                className="bg-white text-black border-[#ADADAD] h-12"
              />
            </div>

            <div className="flex flex-col gap-1 mb-6">
              <Label htmlFor="password" className="text-[#084B54] text-[0.87rem] font-aeonik font-normal">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••••••"
                required
                className="bg-white text-black border-[#ADADAD] h-12"
              />
            </div>

            <SubmitButton
              pendingText="Signing Up..."
              
              className="bg-[#20504B] font-aeonik w-full h-12 text-white rounded-md"
            >
              Sign Up
            </SubmitButton>

            <FormMessage message={message} />

            <div className="text-center mt-4">
              <p className="text-[#555555] text-sm font-aeonik font-normal">
                Already have an account?{" "}
                <Link href="/login" className="text-[#0AA462] font-medium">
                  Sign in
                </Link>
              </p>
            </div>

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
          </form>
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
