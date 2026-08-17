import { Phone } from "lucide-react";
import { Brand } from "./Brand";
import { ButtonLink } from "./ButtonLink";
import { emailAddress, navigationItems, paperTexture, phoneNumber, type SiteTheme } from "./siteConfig";

type SiteFooterProps = {
  theme: SiteTheme;
  showCta?: boolean;
  id?: string;
};

// TODO(assets): Cummings & Co. logo pending from client.
const cummingsLogo: string | null = null;

function BrokerageDetails({ className }: { className?: string }) {
  return (
    <div className={className}>
      <strong>Cummings &amp; Co Realtors</strong>
      <span>108 W. Timonium Road<br />Timonium, MD 21093</span>
      <span>Office <a href="tel:+14108230033">(410) 823-0033</a></span>
      <span className="site-footer__brokerage-logo-slot" aria-hidden={!cummingsLogo}>
        {cummingsLogo && <img src={cummingsLogo} alt="Cummings & Co. Realtors" />}
      </span>
    </div>
  );
}

function FooterLinks({ className }: { className?: string }) {
  return <div className={className}>{navigationItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div>;
}

const backgroundImage = `linear-gradient(rgba(16,42,67,.98),rgba(16,42,67,.98)),url(${paperTexture})`;

export function SiteFooter({ theme, showCta = true, id }: SiteFooterProps) {
  if (theme === "home") {
    return <footer id={id} className="footer" style={{ backgroundImage }}><div className="footer__top"><Brand theme="home" compact footer /><p className="footer__statement">A Clear Plan for What Comes Next.<br /><i>Anchored in Baltimore.</i></p><div className="footer__contact"><a className="footer__phone" href="tel:+14103751400"><Phone size={15} /> {phoneNumber}</a><a href={`mailto:${emailAddress}`}>{emailAddress}</a><BrokerageDetails className="footer__brokerage" />{showCta && <ButtonLink theme="home">Schedule a Conversation</ButtonLink>}</div></div><div className="footer__bottom"><FooterLinks className="footer__links" /><p>© 2026 Downsize Baltimore. All rights reserved.</p><p>Real estate services provided in affiliation with a licensed brokerage.</p></div></footer>;
  }

  if (theme === "downsizing" || theme === "aging") {
    return <footer className="ds-footer" id={id ?? "contact"} style={{ backgroundImage }}><div className="ds-footer__top"><div><Brand theme={theme} footer /></div><div><p className="ds-footer__statement">A Clear Plan for What Comes Next.<br /><i>Anchored in Baltimore.</i></p></div><div className="ds-footer__contact"><a className="ds-phone" href="tel:+14103751400">{theme === "downsizing" && <Phone size={15} />} {phoneNumber}</a><a href={`mailto:${emailAddress}`}>{emailAddress}</a><BrokerageDetails />{showCta && <ButtonLink theme={theme}>Schedule a Conversation</ButtonLink>}</div></div><div className="ds-footer__bottom"><FooterLinks className="ds-footer__links" /><span>© 2026 Downsize Baltimore. All rights reserved.</span><span>Real estate services provided in affiliation with a licensed brokerage.</span></div></footer>;
  }

  const footerClasses = {
    buying: { footer: "bs-footer", top: "bs-footer__top", statement: "bs-footer__statement", contact: "bs-footer__contact", phone: "bs-footer__phone", brokerage: "bs-footer__brokerage", bottom: "bs-footer__bottom" },
    contact: { footer: "contact-footer", top: "contact-footer__top", statement: "", contact: "contact-footer__details", phone: "contact-footer__phone", brokerage: "", bottom: "contact-footer__bottom" },
    meet: { footer: "meet-footer", top: "meet-footer__top", statement: "", contact: "meet-footer__contact", phone: "meet-footer__phone", brokerage: "", bottom: "meet-footer__bottom" },
    resource: { footer: "resource-footer", top: "resource-footer__top", statement: "", contact: "resource-footer__contact", phone: "resource-footer__phone", brokerage: "", bottom: "resource-footer__bottom" },
  } as const;
  const classes = footerClasses[theme];

  return <footer id={id} className={classes.footer}><div className={classes.top}><div><Brand theme={theme} footer /><p className={classes.statement || undefined}>A Clear Plan for What Comes Next.<br /><i>Anchored in Baltimore.</i></p></div><div className={classes.contact}><a className={classes.phone} href="tel:+14103751400"><Phone size={15} /> {phoneNumber}</a><a href={`mailto:${emailAddress}`}>{emailAddress}</a><BrokerageDetails className={classes.brokerage || undefined} />{showCta && <ButtonLink theme={theme}>Schedule a Conversation</ButtonLink>}</div></div><div className={classes.bottom}><FooterLinks />{theme === "buying" ? <><p>© 2026 Downsize Baltimore. All rights reserved.</p><p>Real estate services provided in affiliation with a licensed brokerage.</p></> : <><span>© 2026 Downsize Baltimore. All rights reserved.</span><span>Real estate services provided in affiliation with a licensed brokerage.</span></>}</div></footer>;
}
