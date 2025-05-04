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
    <main className="flex h-screen items-center justify-center bg-white p-6">
      {/* Left side - Login form */}
      <div className="flex h-full w-full flex-col items-center justify-center px-24 py-14">
        <form className="w-full">
          <h1 className="font-aeonik text-[2.2rem] font-bold">
            <span className="text-[#084B54]">Welcome </span>
            <span className="text-[#0AA462]">back!</span>
          </h1>
          <p className="mb-4 font-aeonik text-sm tracking-[-0.025em] text-[#555555]">
            Doctor or patient? Sign In to continue.
          </p>

          <div className="mb-2 flex flex-col gap-1">
            <Label
              htmlFor="email"
              className="font-aeonik text-sm font-normal text-[#555555]"
            >
              Email
            </Label>
            <Input
              name="email"
              placeholder="you@example.com"
              required
              className="h-12 border-[#ADADAD] bg-white text-black"
            />
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="font-aeonik text-sm font-normal text-[#555555]"
              >
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="font-aeonik text-sm font-medium tracking-[-0.025em] text-[#555555] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="••••••••••••"
              required
              className="h-12 border-[#ADADAD] bg-white text-black"
            />
          </div>

          <SubmitButton
            pendingText="Signing In..."
            formAction={signInAction}
            className="h-12 w-full rounded-md bg-[#20504B] font-aeonik text-white transition-colors duration-200 hover:bg-[#2a6a64]"
          >
            Sign In
          </SubmitButton>

          <FormMessage message={searchParams} />

          <div className="mt-6 text-center">
            <p className="font-aeonik text-sm font-normal text-[#555555]">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-[#0AA462] hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
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
