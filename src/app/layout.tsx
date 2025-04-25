import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getUserLocale } from "@/services/locale";
import "@/styles/globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "DoctoLink",
  description:
    "Easily book medical appointments in Algeria. Find trusted doctors, check availability, and manage your visits with ease.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getUserLocale();
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground font-aeonik ltr:font-aeonik rtl:font-aeonik">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
