import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, Phone, Send } from "lucide-react";
import { ButtonLink } from "../components/ButtonLink";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { emailAddress, phoneNumber } from "../components/siteConfig";

/**
 * Harbor House Editorial — Contact page.
 * A calm invitation into conversation: generous paper space, one human portrait,
 * gold rules, and a clear Calendly-first path instead of lead-generation pressure.
 */

const heroImage = "/manus-storage/mary-lynch-contact-chair_dd829984.jpg";
const paperTexture = "/manus-storage/downsize-baltimore-paper-texture_268a29f4.png";

const conversationTopics = ["Downsizing & Moving", "Buying & Selling", "Aging in Place", "Helping a Parent or Loved One", "Exploring Housing Options", "Speaking & Education"];
const formTopics = ["I'm considering downsizing or moving", "I'm buying or selling a home", "I'm exploring aging in place", "I'm helping a parent or loved one", "I'm exploring housing options", "I'm looking for a trusted resource", "I'm interested in speaking or educational programs", "I'm interested in NAIPC or community collaboration", "Something else"];

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent("A note for Mary from Downsize Baltimore");
    const body = encodeURIComponent(`Name: ${data.get("name") || ""}\nEmail: ${data.get("email") || ""}\nPhone: ${data.get("phone") || ""}\nWhat brings me here: ${data.get("topic") || ""}\n\n${data.get("message") || ""}`);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return <div className="contact-page">
    <SiteHeader theme="contact" />

    <main>
      <section className="contact-hero"><div className="contact-hero__copy"><p className="contact-eyebrow">A place to begin</p><h1>Let’s Talk About<br /><i>What Comes Next.</i></h1><div className="contact-rule" /><p>You don’t need to have all the answers before you reach out.</p><p>Whether you’re considering a move, helping someone you love, wondering if your current home still works for you, or simply trying to understand your options, let’s start with a conversation.</p><ButtonLink theme="contact">Schedule a Conversation</ButtonLink><small>No pressure. No obligation. Just a place to start.</small></div><div className="contact-hero__photo"><img src={heroImage} alt="Mary Lynch seated in a cane chair in a bright home" /><span>01 / A conversation can be the beginning.</span></div></section>

      <section className="contact-topics"><div className="contact-section-heading"><p className="contact-eyebrow">Bring what’s on your mind</p><h2>What Can We<br /><i>Talk About?</i></h2><p>You do not have to arrive with the right words. These are simply a few of the conversations Mary often helps families begin.</p></div><div className="contact-topic-list">{conversationTopics.map((topic, index) => <div key={topic}><span>0{index + 1}</span><p>{topic}</p><ArrowUpRight size={17} /></div>)}</div></section>

      <section className="contact-form-section"><div className="contact-form-intro"><p className="contact-eyebrow">A quieter way to reach out</p><h2>Rather Send<br /><i>Me a Note?</i></h2><p>That’s perfectly fine, too. Tell me a little about what’s on your mind and I’ll be in touch.</p><div className="contact-form-note"><Mail size={19} strokeWidth={1.3} /><span>Your note will come directly to Mary.</span></div></div><form className="contact-form" onSubmit={handleSubmit}><label>Name<input name="name" type="text" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" /></label><label>What brings you here?<select name="topic" defaultValue=""><option value="" disabled>Select one</option>{formTopics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}</select></label><label className="contact-form__message">Tell me a little about what’s on your mind.<textarea name="message" rows={5} /></label><button type="submit" className="contact-button contact-button--gold"><Send size={15} /> Send Mary a Note <ArrowUpRight size={16} /></button>{sent && <p className="contact-form__status" role="status">Your email app should open with your note addressed to Mary.</p>}</form></section>

      <section className="contact-direct" style={{ backgroundImage: `url(${paperTexture})` }}><div className="contact-direct__frame"><div><p className="contact-eyebrow">Prefer to call or email?</p><h2>Sometimes It’s<br /><i>Just Easier.</i></h2></div><div className="contact-direct__info"><p>Sometimes it’s just easier to pick up the phone. You’re always welcome to reach out directly.</p><a className="contact-direct__phone" href="tel:+14103751400"><Phone size={18} /> {phoneNumber}</a><a className="contact-direct__email" href={`mailto:${emailAddress}`}>{emailAddress}</a></div></div></section>
    </main>
    <SiteFooter theme="contact" />
  </div>;
}
