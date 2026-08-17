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
      /* min-h rather than h: a section fills the viewport when its content is
         short, and grows instead of spilling into the next one when it is not.
         Children that used h-full to fill the old fixed height must use flex-1
         and have their section pass "flex flex-col" here, since height:100%
         does not resolve against a min-height parent. */
      className={`relative min-h-[calc(100dvh-var(--header-height))] snap-start snap-always bg-cover bg-center  ${bgImage ? "" : bg ? `bg-linear-to-br ${bg}` : ""} ${className ?? ""}`}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
    >
      {bgImage ? <div className={`absolute inset-0 bg-linear-to-br ${bg}`} aria-hidden /> : null}
      {children}
    </section>
  );
}
