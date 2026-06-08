"use client";

import Image from "next/image";
import { GlobeIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { PageSection } from "@/components/PageSection";
import { useLanguage } from "@/components/LanguageProvider";

const rows = [
  {
    icon: <MailIcon className="h-5 w-5" />,
    label: "humanitarianrecovery2022@gmail.com",
    href: "mailto:humanitarianrecovery2022@gmail.com",
    underline: true,
  },
  {
    icon: <PhoneIcon className="h-5 w-5" />,
    label: "+380951818941",
    href: "tel:+380951818941",
    underline: false,
  },
  {
    icon: <GlobeIcon className="h-5 w-5" />,
    label: "humanitarianrecovery.org.ua",
    href: "https://humanitarianrecovery.org.ua",
    underline: true,
  },
];

export function Contacts() {
  const { t } = useLanguage();

  return (
    <PageSection id="contacts" className="grid grid-cols-1 p-0 md:grid-cols-2">
      <div className="flex flex-col bg-brand-dark px-8 py-12 sm:px-14">
        <h2 className="text-5xl font-bold text-white sm:text-6xl">{t.contacts.title}</h2>
        <div className="flex flex-1 items-center justify-center py-10">
          <Image
            src="/images/logo-white.png"
            alt="Humanitarian Recovery"
            width={340}
            height={270}
            className="w-[62%] max-w-[300px]"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center gap-7 bg-brand px-8 py-14 sm:px-14">
        <h3 className="text-3xl font-medium text-white sm:text-[34px]">{t.contacts.orgName}</h3>
        <div className="space-y-5">
          {rows.map((row) => (
            <a
              key={row.label}
              href={row.href}
              className="flex items-center gap-4 rounded-full bg-white py-2.5 pl-2.5 pr-6 shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-dark text-white">
                {row.icon}
              </span>
              <span
                className={`break-all text-[15px] text-ink sm:text-base ${
                  row.underline ? "underline" : ""
                }`}
              >
                {row.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
