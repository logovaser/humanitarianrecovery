import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

import { dictionaries, LOCALE_COOKIE, toLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

async function getLocale() {
  const cookieStore = await cookies();
  return toLocale(cookieStore.get(LOCALE_COOKIE)?.value);
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { meta } = dictionaries[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    icons: { icon: "/images/logo-green.png" },
    // app/opengraph-image.tsx supplies the preview image for every route.
    openGraph: {
      type: "website",
      siteName: "Humanitarian Recovery",
      title: meta.title,
      description: meta.description,
      locale: locale === "uk" ? "uk_UA" : "en_US",
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
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
