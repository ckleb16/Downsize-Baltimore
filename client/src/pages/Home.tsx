// Harbor House Editorial: warm editorial layout, Baltimore navy, cream paper, antique gold, restrained motion.
import {
  ArrowUpRight,
  Baby,
  BookOpen,
  Anchor,
  Home as HomeIcon,
  MoveRight,
  Pause,
  Play,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "../components/ButtonLink";
import { Credentials, type Credential } from "../components/Credentials";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { Testimonials, type Testimonial } from "../components/Testimonials";

const heroImage = "/manus-storage/home-hero-optimized.jpg";
const maryPortrait = "/manus-storage/Mary_Lynch_3d838598.jpg";
const paperTexture = "/manus-storage/downsize-baltimore-paper-texture_268a29f4.png";
const contourTexture = "/manus-storage/downsize-baltimore-contour-lines_aaa317b7.png";
const washTexture = "/manus-storage/downsize-baltimore-warm-wash_0631c386.png";
const cummingsCircleLogo = "/manus-storage/cummings-and-co-circle.png";

const ways = [
  {
    icon: Scale,
    number: "01",
    title: "I’m Thinking About Downsizing",
    body: "Whether you’re ready now or just beginning to wonder what life with less house might look like, we can create a plan that works on your timeline.",
    link: "Explore Downsizing",
    href: "/downsizing-services",
  },
  {
    icon: HomeIcon,
    number: "02",
    title: "I’m Buying or Selling",
    body: "Real estate decisions later in life often involve more than bedrooms, bathrooms, and price. I’ll help you look at the whole picture.",
    link: "Explore Buying & Selling",
    href: "/buying-selling",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "I’m Trying to Stay in My Home",
    body: "Moving isn’t always the answer. Sometimes the right plan is making your current home safer, easier, and better suited to the years ahead.",
    link: "Explore Aging in Place",
    href: "/aging-in-place",
  },
];

const resources = [
  ["Aging in Place", "Ideas and resources for making home safer and more comfortable.", ShieldCheck, "/resource-center?path=stay#resource-library"],
  ["Downsizing & Moving", "Where to begin, what to keep, and how to make the process manageable.", MoveRight, "/resource-center?path=downsizing#resource-library"],
  ["55+ & Lifestyle Communities", "Understanding communities, housing options, and what might fit your lifestyle.", Sparkles, "/resource-center?path=housing#resource-library"],
  ["Buying & Selling", "Real estate guidance for moves that often involve more than real estate.", HomeIcon, "/buying-selling"],
  ["ADUs & Multigenerational Living", "Creative housing solutions that can keep families connected while maintaining independence.", Baby, "/resource-center?path=housing#resource-library"],
  ["Probate & Estate Resources", "Guidance and trusted professionals when a home is part of a larger family transition.", BookOpen, "/resource-center?path=probate#resource-library"],
];

// Edit the wording shown under “Credentials & specialties” here.
const credentials: Credential[] = [
  { name: "Certified Senior Advisor" },
  { name: "Chair & Founder, National Aging in Place Council for Greater Baltimore" },
  { name: "Seniors Real Estate Specialist" },
  { name: "Senior Home Coach" },
  { name: "Certified Probate Real Estate Specialist" },
];

// TODO(assets): approved client excerpts and attributions pending from client.
const testimonials: Testimonial[] = [];

const commonQuestions = [
  "Should Mom stay in her home?",
  "Would downsizing make life easier?",
  "Where do we even begin?",
];

function CommonQuestions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const activeIndexRef = useRef(0);
  const transitionTimerRef = useRef<number | null>(null);

  const showQuestion = useCallback((nextIndex: number) => {
    const normalizedIndex = (nextIndex + commonQuestions.length) % commonQuestions.length;
    const currentIndex = activeIndexRef.current;

    if (normalizedIndex === currentIndex) return;

    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
    }

    setPreviousIndex(currentIndex);
    activeIndexRef.current = normalizedIndex;
    setActiveIndex(normalizedIndex);
    transitionTimerRef.current = window.setTimeout(() => {
      setPreviousIndex(null);
      transitionTimerRef.current = null;
    }, 450);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const syncVisibility = () => setIsPageVisible(document.visibilityState !== "hidden");

    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  useEffect(() => {
    if (isPaused || isHovered || hasFocus || !isPageVisible || prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      showQuestion(activeIndexRef.current + 1);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [hasFocus, isHovered, isPageVisible, isPaused, prefersReducedMotion, showQuestion]);

  useEffect(() => () => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
    }
  }, []);

  return (
    <div
      className="questions-strip__carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Common questions"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHasFocus(false);
        }
      }}
    >
      <ol className="sr-only">
        {commonQuestions.map((question) => <li key={question}>{question}</li>)}
      </ol>
      <div className="questions-strip__viewport" aria-hidden="true">
        {commonQuestions.map((question, index) => (
          <p
            className={`questions-strip__question${index === activeIndex ? " is-active" : ""}${index === previousIndex ? " is-exiting" : ""}`}
            key={question}
          >
            {question}
          </p>
        ))}
      </div>
      <div className="questions-strip__controls" role="group" aria-label="Question slider controls">
        <div className="questions-strip__positions" role="group" aria-label="Choose a question">
          {commonQuestions.map((question, index) => (
            <button
              type="button"
              className="questions-strip__position"
              aria-label={`Show question ${index + 1}: ${question}`}
              aria-pressed={index === activeIndex}
              onClick={() => showQuestion(index)}
              key={question}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="questions-strip__pause"
          aria-label={prefersReducedMotion ? "Automatic question rotation is disabled by your motion preference" : isPaused ? "Resume automatic question rotation" : "Pause automatic question rotation"}
          disabled={prefersReducedMotion}
          onClick={() => setIsPaused((paused) => !paused)}
        >
          {isPaused || prefersReducedMotion ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div id="top" className="site-shell">
      <SiteHeader theme="home" />

      <main>
        <section className="hero">
          <img src={heroImage} width={1536} height={1024} fetchPriority="high" decoding="async" alt="A welcoming navy blue home at golden hour in a Baltimore neighborhood" className="hero__image" />
          <div className="hero__veil" />
          <div className="hero__content">
            <p className="eyebrow eyebrow--light"><span /> Baltimore-area real estate guidance</p>
            <h1>A Clear Plan<br /><i>for What Comes Next.</i></h1>
            <p className="hero__copy">Downsizing, staying put, or figuring out what the next home might look like can feel overwhelming. You don’t have to have all the answers before you begin.</p>
            <p className="hero__copy hero__copy--second">I help Baltimore-area families understand their options, make a plan, and move forward with confidence.</p>
            <ButtonLink theme="home">Schedule a Conversation</ButtonLink>
          </div>
          <div className="hero__caption"><span>30 YEARS</span><span>Helping Baltimore families make thoughtful real estate decisions.</span></div>
        </section>

        <section id="ways-to-begin" className="ways section-paper">
          <div className="section-heading"><h2 className="eyebrow section-heading__title">Three ways to begin</h2></div>
          <div className="way-grid">
            {ways.map(({ icon: Icon, number, title, body, link, href }) => <article className="way-card" key={title}>
              <div className="way-card__top"><span>{number}</span><Icon size={29} strokeWidth={1.2} /></div>
              <h3>{title}</h3>
              <p>{body}</p>
              <a href={href}>{link}<MoveRight size={17} /></a>
            </article>)}
          </div>
        </section>

        <section className="questions-strip section-paper" aria-labelledby="common-questions-label">
          <div className="questions-strip__marker"><Anchor size={23} strokeWidth={1.2} /><span id="common-questions-label">QUESTIONS I HEAR EVERY DAY…</span></div>
          <CommonQuestions />
        </section>

        <section id="meet-mary" className="mary-section">
          <div className="mary__image-panel" style={{ backgroundImage: `url(${washTexture})` }}>
            <div className="mary__portrait-frame"><img src={maryPortrait} loading="lazy" decoding="async" alt="Mary Lynch seated on a cream sofa" className="mary__portrait" /><div className="mary__portrait-caption"><span>Mary Lynch</span><small>Founder, Downsize Baltimore</small></div></div>
          </div>
          <div className="mary__copy">
            <h2>Why Families<br /><i>Choose Mary</i></h2>
            <div className="gold-rule" />
            <p>For nearly three decades, I’ve helped Baltimore families buy and sell homes.</p>
            <p>Over time, that work became about much more than real estate.</p>
            <p>Downsize Baltimore grew from seeing how overwhelming housing decisions can become when family, aging, finances, belongings, and the future all collide at once.</p>
            <p>My role isn’t to convince you to move. It’s to help you understand your options, connect you with the right resources, and create a clear plan for whatever comes next.</p>
            <Credentials credentials={credentials} />
            <div className="mary__brokerage-mark">
              <img src={cummingsCircleLogo} width={300} height={300} loading="lazy" decoding="async" alt="" aria-hidden="true" />
              <strong>Cummings &amp; Co. Realtors</strong>
            </div>
            <a className="text-link" href="/meet-mary">Meet Mary <ArrowUpRight size={16} /></a>
          </div>
        </section>
        <Testimonials testimonials={testimonials} />
        <section id="resources" className="resources" style={{ backgroundImage: `linear-gradient(rgba(16,42,67,.97), rgba(16,42,67,.97)), url(${contourTexture})` }}>
          <div className="resources__head"><div><p className="eyebrow eyebrow--gold">Resources for the road ahead</p><h2>Chart<br /><i>the Course.</i></h2></div><div className="resources__intro">There isn’t one right answer when it comes to housing, aging, and what comes next.<br /><br />That’s why I’ve built a collection of practical resources to help you understand your options before you need them.</div></div>
          <div className="resource-grid">            {resources.map(([title, body, Icon, href]) => <a className="resource-card" href={href as string} key={title as string}><Icon size={24} strokeWidth={1.2} /><h3>{title as string}</h3><p>{body as string}</p><ArrowUpRight className="resource-card__arrow" size={17} /></a>)}
</div>
          <div className="resources__cta"><ButtonLink theme="home" variant="light" href="/resource-center">Visit the Resource Center</ButtonLink></div>
        </section>

        <section id="contact" className="final-cta section-paper" style={{ backgroundImage: `url(${paperTexture})` }}>
          <div className="final-cta__mark"><Anchor size={28} strokeWidth={1.2} /></div>
          <div className="final-cta__content"><p className="eyebrow">Your next chapter, thoughtfully planned</p><h2><span className="final-cta__headline-line">Move Forward</span><span className="final-cta__headline-line"><i>With Clarity.</i></span></h2><p>Whether a change is near, years away, or simply taking shape, a thoughtful conversation can help you understand your options and choose what comes next with confidence.</p><div className="final-cta__buttons"><ButtonLink theme="home">Schedule a Conversation</ButtonLink></div></div>
        </section>
      </main>

      <SiteFooter theme="home" id="newsletter" showCta={false} />
    </div>
  );
}
