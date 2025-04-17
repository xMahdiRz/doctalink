import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getUserLocale } from "@/services/locale";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js App",
  description: "A simple Next.js application",
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
      <body className="bg-background text-foreground ltr:font-aeonik rtl:font-aeonik">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          </ThemeProvider> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
