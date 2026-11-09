import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

import { dictionaries, LOCALE_COOKIE, toLocale } from "@/lib/i18n";

async function getLocale() {
  const cookieStore = await cookies();
  return toLocale(cookieStore.get(LOCALE_COOKIE)?.value);
}

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = dictionaries[await getLocale()];
  return {
    title: meta.title,
    description: meta.description,
    icons: { icon: "/images/logo-green.png" },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="h-full">
        <LanguageProvider initialLocale={locale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
