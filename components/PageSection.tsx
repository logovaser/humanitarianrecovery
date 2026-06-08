import type { ReactNode } from "react";

type PageSectionProps = {
  id: string;
  bg?: string;
  bgImage?: string;
  className?: string;
  children: ReactNode;
};

export function PageSection({ id, bg, bgImage, className, children }: PageSectionProps) {
  return (
    <section
      id={id}
      className={`relative h-dvh snap-start snap-always bg-cover bg-center px-6 py-16 sm:px-12 ${bgImage ? "" : bg ? `bg-linear-to-br ${bg}` : ""} ${className ?? ""}`}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
    >
      {bgImage ? (
        <div className={`absolute inset-0 bg-linear-to-br ${bg}`} aria-hidden />
      ) : null}
      {children}
    </section>
  );
}
