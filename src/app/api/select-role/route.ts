import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const role = formData.get("role") as string;

  if (!role || (role !== "patient" && role !== "doctor")) {
    return NextResponse.redirect(
      new URL("/user-selection?error=Invalid role selected", request.url)
    );
  }

  if (role === "patient") {
    return NextResponse.redirect(new URL("/sign-up/patient", request.url));
  } else {
    return NextResponse.redirect(new URL("/sign-up/doctor", request.url));
  }
}
