import { resetPasswordAction, signUpAction } from "@/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Link } from "lucide-react";
import LogoLight from "../../../../public/logoLight";
import { FormMessage, Message } from "@/components/form-message";
import Image from "next/image";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
   <main className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-[83rem] flex rounded-xl overflow-hidden">
        {/* Left side - Signup form */}
        <div className="w-1/2 p-12 flex items-center justify-center">
          <form className="max-w-md mx-auto mt-8">
            <h1 className="text-[1.8rem] font-bold font-aeonik text-[#084B54] mb-1">Join DoctaLink!</h1>
            <p className="text-sm text-[#555555] tracking-[-0.025em] font-aeonik mb-6">
            Enter your new password below to regain access to your account.
            </p>

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
            <div className="flex flex-col gap-1 mb-6">
              <Label htmlFor="confirmPassword" className="text-[#084B54] text-[0.87rem] font-aeonik font-normal">
                Confirm Password
              </Label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="••••••••••••"
                required
                className="bg-white text-black border-[#ADADAD] h-12"
              />
            </div>

            <SubmitButton
              pendingText="Signing Up..."
              className="bg-[#20504B] font-aeonik w-full h-12 text-white rounded-md"
              formAction={resetPasswordAction}
            >
              Sign Up
            </SubmitButton>
            <FormMessage message={searchParams} />
            <p className="flex items-center justify-center w-full  text-center mt-4">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[#084B54] text-sm text-[0.87rem] font-aeonik font-normal">
                Back to Sign In
              </span>
            </p>
          </form>
        </div>

        {/* Right side - Testimonial */}
        <div className="w-1/2 bg-[#20504B] p-12 flex rounded-3xl bg-center bg-cover  flex-col gap-36 min-h-[38rem] " style={{ backgroundImage: "url('/join-bg.png')" }}>
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
  );
}
