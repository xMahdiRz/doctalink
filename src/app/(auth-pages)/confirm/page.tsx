import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import LogoLight from "../../../../public/logoLight";
import EmailIcon from "../../../../public/letter-confirm";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

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
          <div className="max-w-md mx-auto flex-col justify-center mt-8 ">
            <EmailIcon />
            <h1 className="text-[2.2rem] font-aeonik font-bold">
              <span className="text-[#084B54]">Check Your </span>
              <span className="text-[#0AA462]">Email!</span>
            </h1>
            <p className="text-sm text-[#555555] tracking-[-0.025em] font-aeonik mb-6">
              We’ve sent an email to{" "}
              <span className="text-[#0AA462] ">“you@example.com” </span> to
              verify your email address. Please check your inbox and follow the
              link to complete your registration.
            </p>
            <div>
              <p className="text-sm text-[#555555] tracking-[-0.025em] font-aeonik font-normal mb-2">Didn’t get the email? <span className="text-[#0AA462]">Resend it</span> or check your spam folder.</p>
              <Link href="/sign-in" passHref>
  <Button className="bg-[#20504B] font-aeonik w-full h-full text-white rounded-md flex items-center justify-center">
    Go to Sign In
    <ArrowUpRight className="ml- h-5 w-5" />
  </Button>
</Link>
            </div>
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