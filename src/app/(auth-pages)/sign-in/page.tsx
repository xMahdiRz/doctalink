import { signInAction } from "@/actions/auth";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { url } from "inspector";
import Logo from "../../../../public/logo";
import Image from "next/image";
import LogoLight from "../../../../public/logoLight";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/protected");
  }

  const searchParams = await props.searchParams;

  return (
    <main className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-[83rem] flex rounded-xl overflow-hidden ">
        {/* Left side - Login form */}
        <div className="w-1/2 p-12">
          <form className="max-w-md mx-auto  mt-16">
            <h1 className="text-[2.2rem] font-bold">
              <span className="text-[#084B54]">Welcome </span>
              <span className="text-[#0AA462]">back!</span>
            </h1>
            <p className="text-sm text-[#084B54] tracking-[-0.025em] font-aeonik mb-4">
              Doctor or patient? Sign in to continue.
            </p>

            <div className="flex flex-col gap-1 mb-6">
              <Label htmlFor="email" className="text-[#084B54] text-[0.87rem] font-aeonik font-normal">
                Email
              </Label>
              <Input
                name="email"
                placeholder="you@example.com"
                required
                className="bg-white text-black border-[#ADADAD] h-12"
              />
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-[#084B54] text-[0.87rem] font-aeonik font-normal">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-[#555555] text-[0.87rem] tracking-[-0.025em] font-aeonik font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                type="password"
                name="password"
                placeholder="••••••••••••"
                required
                className="bg-white text-black border-[#ADADAD] h-12"
              />
            </div>

            <SubmitButton
              pendingText="Signing In..."
              formAction={signInAction}
              className="bg-[#20504B] font-aeonik w-full h-12 text-white rounded-md"
            >
              Sign In
            </SubmitButton>

            <FormMessage message={searchParams} />

            <div className="text-center mt-6">
              <p className="text-[#555555] text-sm font-aeonik font-normal hover:underline">
                Don't have an account?{" "}
                <Link href="/user-selection" className="text-[#0AA462] font-medium">
                  Sign Up
                </Link>
              </p>
            </div>

          </form>
            <div className="text-center mt-8   ">
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

        <div className="w-1/2 bg-[#20504B] p-12 flex rounded-3xl flex-col gap-36" style={{ backgroundImage: "url('/auth.svg')" }}>
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
