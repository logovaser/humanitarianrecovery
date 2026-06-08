"use client";

import Image from "next/image";
import Link from "next/link";
import hrLogo from "@/images/HR logo 2.svg";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";

export function Header() {
  const { t } = useLanguage();

  return (
    <div className="fixed top-0 left-0 z-30 flex h-20 w-full items-center justify-between bg-brand px-8 font-bold text-white shadow-2xl">
      <Image src={hrLogo.src} alt="Logo" width={164} height={64} />

      <div className="flex items-center gap-2">
        <Link href="/" className="p-4">
          {t.header.gallery}
        </Link>
        <Link href="/" className="p-4">
          {t.header.educationRequest}
        </Link>
        <Link href="/" className="p-4">
          {t.header.events}
        </Link>
        <div className="ml-2">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
