import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import LogoLight from "../../../../public/logoLight.svg";
import EmailIcon from "../../../../public/letter-confirm";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { forgotPasswordAction } from "@/actions/auth";

export default async function PatientSignUp() {
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
        {/* Left side */}
        <div className="w-1/2 p-12 place-content-center ">
          <form className="max-w-md mx-auto flex-col justify-center mt-8 ">
            <EmailIcon />
            <h1 className="text-[2.2rem] font-aeonik font-bold">
              <span className="text-[#084B54]">Forgot </span>
              <span className="text-[#0AA462]">Password?</span>
            </h1>
            <p className="text-sm text-[#555555] tracking-[-0.025em] font-aeonik mb-6">
              No worries — we’ll send you a reset link. Just enter your email to get started.
            </p>
            <div>
              <label htmlFor="email" className="text-sm text-[#555555] tracking-[-0.025em] font-aeonik font-normal mb-4">Email</label>
              <Input name="email" placeholder="you@example.com" className="w-full mb-4 rounded-md border border-[#ADADAD] " required />
              
                <SubmitButton formAction={forgotPasswordAction} className="bg-[#20504B] font-aeonik w-full h-full text-white rounded-md flex items-center justify-center">
                  Go to Sign In
                  <ArrowUpRight className="ml- h-5 w-5" />
                </SubmitButton>
              
            </div>
          </form>
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