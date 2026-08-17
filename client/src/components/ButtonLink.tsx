import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { calendlyUrl, type SiteTheme } from "./siteConfig";

type ButtonLinkProps = {
  children: ReactNode;
  theme: SiteTheme;
  href?: string;
  variant?: "gold" | "outline" | "light";
};

const buttonClass: Record<SiteTheme, string> = {
  home: "button",
  downsizing: "ds-button",
  aging: "aip-button",
  buying: "bs-button",
  contact: "contact-button",
  meet: "meet-button",
  resource: "resource-button",
};

export function ButtonLink({ children, theme, href = calendlyUrl, variant = "gold" }: ButtonLinkProps) {
  const baseClass = buttonClass[theme];
  return (
    <a className={`${baseClass} ${baseClass}--${variant}`} href={href}>
      {children}
      <ArrowUpRight size={theme === "downsizing" || theme === "aging" ? 15 : 16} strokeWidth={1.8} />
    </a>
  );
}
