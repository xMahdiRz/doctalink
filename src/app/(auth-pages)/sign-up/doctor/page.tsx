import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage, type Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import LogoLight from "@/public/logoLight.svg";

export default async function DoctorSignUp({
  searchParams,
}: {
  searchParams: Promise<Message>;
}) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/protected");
  }

  const message = await searchParams;

  return (
    <main className="flex h-screen items-center justify-center bg-white p-6">
      {/* Left side - Signup form */}
      <div className="flex h-full w-full flex-col items-center justify-center px-24 py-14">
        <form className="w-full">
          <h1 className="mb-1 font-aeonik text-[1.8rem] font-bold text-[#084B54]">
            Hey <span className="text-[#0AA462]">Doctor</span>!
          </h1>
          <p className="mb-6 font-aeonik text-sm tracking-[-0.025em] text-[#555555]">
            Fill out this form to join our network of providers
          </p>

          <div className="mb-4 flex flex-col gap-1">
            <Label
              htmlFor="email"
              className="font-aeonik text-[0.87rem] text-[#084B54]"
            >
              Email
            </Label>
            <Input
              name="email"
              type="email"
              placeholder="doctor@example.com"
              required
              className="h-12 border-[#ADADAD] bg-white text-black"
            />
          </div>

          <div className="mb-4 flex flex-col gap-1">
            <Label
              htmlFor="medicalId"
              className="font-aeonik text-[0.87rem] text-[#084B54]"
            >
              Medical License ID
            </Label>
            <Input
              name="medicalId"
              placeholder="Your medical license number"
              required
              className="h-12 border-[#ADADAD] bg-white text-black"
            />
          </div>

          <div className="mb-6 flex flex-col gap-1">
            <Label
              htmlFor="password"
              className="font-aeonik text-[0.87rem] text-[#084B54]"
            >
              Password
            </Label>
            <Input
              type="password"
              name="password"
              placeholder="••••••••••••"
              required
              className="h-12 border-[#ADADAD] bg-white text-black"
            />
          </div>

          <SubmitButton
            pendingText="Signing Up..."
            className="h-12 w-full rounded-md bg-[#20504B] font-aeonik text-white transition-colors duration-200 hover:bg-[#2a6a64]"
          >
            Sign Up
          </SubmitButton>

          <FormMessage message={message} />

          <div className="mt-4 text-center">
            <p className="font-aeonik text-sm font-normal text-[#555555]">
              Already have an account?{" "}
              <Link
                className="font-medium text-[#0AA462] hover:underline"
                href="/sign-in"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[#555555]">
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

      <div className="flex h-full w-full flex-col justify-between rounded-3xl bg-[#20504B] bg-[url('/join-doc-bg.png')] bg-cover bg-center px-20 py-14">
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
