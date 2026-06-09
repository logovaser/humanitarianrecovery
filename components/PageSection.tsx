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
      className={`relative h-[calc(100dvh-80px)] snap-start snap-always bg-cover bg-center  ${bgImage ? "" : bg ? `bg-linear-to-br ${bg}` : ""} ${className ?? ""}`}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
    >
      {bgImage ? <div className={`absolute inset-0 bg-linear-to-br ${bg}`} aria-hidden /> : null}
      {children}
    </section>
  );
}
