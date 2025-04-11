import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import ThemeProvider from "@/context/theme-provider";

import { getUserLocale } from "@/services/locale";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const locale = await getUserLocale();
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
