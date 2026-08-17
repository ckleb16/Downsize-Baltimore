import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./Brand";
import { ButtonLink } from "./ButtonLink";
import { currentPathByTheme, navigationItems, type SiteTheme } from "./siteConfig";

type SiteHeaderProps = { theme: SiteTheme };

const standardClasses = {
  buying: { header: "bs-header", top: "bs-header__top", actions: "bs-header__actions", nav: "bs-desktop-nav", mobile: "bs-mobile-nav", menu: "bs-menu-toggle" },
  contact: { header: "contact-header", top: "contact-header__top", actions: "", nav: "contact-nav", mobile: "contact-mobile-nav", menu: "contact-menu" },
  meet: { header: "meet-header", top: "meet-header__top", actions: "", nav: "meet-nav", mobile: "meet-mobile-nav", menu: "meet-menu" },
  resource: { header: "resource-header", top: "resource-header__top", actions: "", nav: "resource-nav", mobile: "resource-mobile-nav", menu: "resource-menu" },
} as const;

export function SiteHeader({ theme }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const currentPath = currentPathByTheme[theme];
  const navItems = navigationItems;
  const mobileNavId = `${theme}-mobile-navigation`;
  const toggleLabel = mobileOpen ? "Close menu" : "Open menu";
  const handleMenuKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || !mobileOpen) return;
    event.preventDefault();
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  };

  if (theme === "home") {
    return (
      <header className="site-header" onKeyDown={handleMenuKeyDown}>
        <div className="header-inner">
          <div className="header-top">
            <Brand theme="home" href="#top" />
            <div className="header-actions">
              <ButtonLink theme="home">Talk to Mary</ButtonLink>
              <button ref={menuButtonRef} className="menu-toggle" aria-label={toggleLabel} aria-expanded={mobileOpen} aria-controls={mobileNavId} onClick={() => setMobileOpen((open) => !open)}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
            </div>
          </div>
          <nav className="desktop-nav" aria-label="Primary navigation">{navItems.map(([label, href]) => <a key={label} href={href} aria-current={href === currentPath ? "page" : undefined}>{label}</a>)}</nav>
        </div>
        {mobileOpen && <nav id={mobileNavId} className="mobile-nav" aria-label="Mobile navigation">{navItems.map(([label, href]) => <a key={label} href={href} aria-current={href === currentPath ? "page" : undefined} onClick={() => setMobileOpen(false)}>{label}<ArrowUpRight size={16} /></a>)}<ButtonLink theme="home">Talk to Mary</ButtonLink></nav>}
      </header>
    );
  }

  if (theme === "downsizing" || theme === "aging") {
    return (
      <header className={`ds-header ${theme === "aging" ? "aip-header" : ""}`} onKeyDown={handleMenuKeyDown}>
        <div className="ds-header__top">
          <Brand theme={theme} />
          <ButtonLink theme={theme}>Talk to Mary</ButtonLink>
          <button ref={menuButtonRef} className="ds-menu" aria-label={toggleLabel} aria-expanded={mobileOpen} aria-controls={mobileNavId} onClick={() => setMobileOpen((open) => !open)}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        <nav id={mobileNavId} className={`ds-nav ${mobileOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map(([label, href]) => <a key={label} href={href} aria-current={href === currentPath ? "page" : undefined} onClick={() => setMobileOpen(false)}>{label}</a>)}
          <span className="ds-nav-cta-mobile"><ButtonLink theme={theme}>Talk to Mary</ButtonLink></span>
        </nav>
      </header>
    );
  }

  const classes = standardClasses[theme];
  return (
    <header className={classes.header} onKeyDown={handleMenuKeyDown}>
      <div className={classes.top}>
        <Brand theme={theme} />
        <div className={classes.actions || undefined}>
          <ButtonLink theme={theme}>Talk to Mary</ButtonLink>
          <button ref={menuButtonRef} className={classes.menu} aria-label={toggleLabel} aria-expanded={mobileOpen} aria-controls={mobileNavId} onClick={() => setMobileOpen((open) => !open)}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      <nav className={classes.nav} aria-label="Primary navigation">{navItems.map(([label, href]) => <a key={label} href={href} aria-current={href === currentPath ? "page" : undefined}>{label}</a>)}</nav>
      {mobileOpen && <nav id={mobileNavId} className={classes.mobile} aria-label="Mobile navigation">{navItems.map(([label, href]) => <a key={label} href={href} aria-current={href === currentPath ? "page" : undefined} onClick={() => setMobileOpen(false)}>{label}<ArrowUpRight size={16} /></a>)}<ButtonLink theme={theme}>Talk to Mary</ButtonLink></nav>}
    </header>
  );
}
