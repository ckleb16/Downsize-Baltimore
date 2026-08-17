import { verticalLogo, wideLogo, type SiteTheme } from "./siteConfig";

type BrandProps = {
  theme: SiteTheme;
  compact?: boolean;
  footer?: boolean;
  href?: string;
};

const brandClass: Record<SiteTheme, string> = {
  home: "brand",
  downsizing: "ds-brand",
  aging: "ds-brand",
  buying: "bs-brand",
  contact: "contact-brand",
  meet: "meet-brand",
  resource: "resource-brand",
};

export function Brand({ theme, compact = false, footer = false, href = "/" }: BrandProps) {
  const classes = [
    brandClass[theme],
    compact && theme === "home" ? "brand--compact" : "",
    footer ? `${brandClass[theme]}--footer` : "",
  ].filter(Boolean).join(" ");
  const imageClass = footer && (theme === "downsizing" || theme === "aging")
    ? "ds-footer__logo"
    : theme === "home"
      ? footer ? "brand__footer-logo" : "brand__wide-logo"
      : undefined;

  return (
    <a href={href} className={classes} aria-label="Downsize Baltimore home">
      <img className={imageClass} src={footer ? verticalLogo : wideLogo} alt="Downsize Baltimore" />
    </a>
  );
}
