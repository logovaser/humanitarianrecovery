import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Humanitarian Recovery — Ukrainian National Mine Action Operator",
  description:
    "Humanitarian Recovery is a national NGO established in 2022, working to protect civilians and support communities affected by explosive threats across Ukraine through EORE, NTS, Mine Victim Assistance and community training.",
  icons: { icon: "/images/logo-green.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-dvh overflow-hidden">{children}</body>
    </html>
  );
}
