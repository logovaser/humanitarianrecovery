"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

export function SectionFooter({
  variant = "light",
  showLogo = true,
}: {
  variant?: "light" | "green";
  showLogo?: boolean;
}) {
  const { t } = useLanguage();
  const green = variant === "green";

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center px-8 pb-4 sm:px-12">
      <div className="w-1/4">
        {showLogo && (
          <Image
            src={green ? "/images/logo-white.png" : "/images/logo-green.png"}
            alt={t.common.orgName}
            width={150}
            height={120}
            className="h-7 w-auto sm:h-8"
          />
        )}
      </div>
      <p
        className={`w-1/2 text-center text-[10px] sm:text-[11px] ${
          green ? "text-white/55" : "text-footer"
        }`}
      >
        {t.footer.copyright}
      </p>
      <div className="w-1/4" />
    </div>
  );
}
