export const calendlyUrl = "https://calendly.com/mary-movewithmarylynch/30min";
export const phoneNumber = "(410) 375-1400";
export const emailAddress = "mary@downsizebaltimore.com";

export const wideLogo = "/manus-storage/DownsizeBaltimoreWide-YelWhite_e501a303.png";
export const verticalLogo = "/manus-storage/DownsizeBaltimoreB-YelWhite_850df9b1.png";
export const paperTexture = "/manus-storage/downsize-baltimore-paper-texture_268a29f4.png";

export const navigationItems = [
  ["Home", "/"],
  ["Downsizing Services", "/downsizing-services"],
  ["Aging in Place", "/aging-in-place"],
  ["Buying & Selling", "/buying-selling"],
  ["Resource Center", "/resource-center"],
  ["Meet Mary", "/meet-mary"],
  ["Contact", "/contact"],
] as const;

export type SiteTheme = "home" | "downsizing" | "aging" | "buying" | "contact" | "meet" | "resource";

export const currentPathByTheme: Record<SiteTheme, string> = {
  home: "/",
  downsizing: "/downsizing-services",
  aging: "/aging-in-place",
  buying: "/buying-selling",
  contact: "/contact",
  meet: "/meet-mary",
  resource: "/resource-center",
};
