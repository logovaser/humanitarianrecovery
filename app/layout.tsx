import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

import { en } from "@/lib/i18n/en";

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
  icons: { icon: "/images/logo-green.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="h-full">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
