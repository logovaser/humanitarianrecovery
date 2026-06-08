import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function TargetIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="13" r="8.2" />
      <circle cx="11" cy="13" r="4.6" />
      <circle cx="11" cy="13" r="1.2" fill="currentColor" stroke="none" />
      <path d="M11 13 19 5" />
      <path d="M15.5 4.4c.6 1.9 1.1 2.4 3 3 -1.9.6-2.4 1.1-3 3 -.6-1.9-1.1-2.4-3-3 1.9-.6 2.4-1.1 3-3Z" />
    </svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M1.6 12S5.6 5 12 5s10.4 7 10.4 7-4 7-10.4 7S1.6 12 1.6 12Z" />
      <circle cx="12" cy="12" r="3.4" />
    </svg>
  );
}

export function CrosshairIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="6.5" />
      <path d="M12 1.8v3.4M12 18.8v3.4M1.8 12h3.4M18.8 12h3.4" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.4" />
      <path d="m3.5 6 8.5 6 8.5-6" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.6 3.2c.5-.1 1 .1 1.3.6l1.7 3a1.3 1.3 0 0 1-.3 1.6l-1.2 1a.6.6 0 0 0-.1.7 11 11 0 0 0 4.6 4.6.6.6 0 0 0 .7-.1l1-1.2a1.3 1.3 0 0 1 1.6-.3l3 1.7c.5.3.7.8.6 1.3l-.6 2.5a1.5 1.5 0 0 1-1.6 1.1C10.8 22.4 1.6 13.2 1.6 4.6A1.5 1.5 0 0 1 2.7 3l2.5-.6Z" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9.2" />
      <path d="M3 12h18M12 2.8c2.6 2.5 4 5.8 4 9.2s-1.4 6.7-4 9.2c-2.6-2.5-4-5.8-4-9.2s1.4-6.7 4-9.2Z" />
    </svg>
  );
}
