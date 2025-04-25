"use server";

import { cookies } from "next/headers";
import { defaultLocale } from "@/i18n/config";

const COOKIE_NAME: string = "NEXT_LOCALE";

export async function getUserLocale(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale, { path: "/" });
}
