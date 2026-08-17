# Homepage Content and Interaction Revision PRD

- **Status:** Approved and implemented
- **Prepared:** August 16, 2026
- **Route:** `/`
- **Implementation status:** Completed and verified against the acceptance criteria below.

## 1. Objective

Make the homepage more direct and confident by removing repetitive or overly cautious language, tightening vertical rhythm, and presenting the three common client questions one at a time in a restrained editorial slider.

## 2. Product principles

- Lead with clarity, confidence, and practical guidance.
- Remove language that sounds pessimistic, tentative, or like the service is being undersold.
- Preserve the warm, human tone and the existing navy, cream, and gold visual system.
- Deletions must close their space completely; they must not leave blank bands, stray borders, or unbalanced padding.
- Motion should feel calm and purposeful, never like a news ticker or advertisement.

## 3. Requested changes, top to bottom

| ID | Current homepage content | Required change | Acceptance criteria |
| --- | --- | --- | --- |
| HOME-01 | Hero caption: “30 YEARS / Helping Baltimore-area families make thoughtful real estate decisions.” | Retain “30 YEARS” and change the second line to “Helping Baltimore families make thoughtful real estate decisions.” The trailing asterisk in the request is treated as formatting, not literal page copy. | The word “area” and its hyphen are removed. The revised caption remains in the same supporting role and does not become more visually prominent. |
| HOME-02 | Intro band: “START WHERE YOU ARE / You don’t have to know the answer yet. Start here.” | Remove the entire intro section, including its anchor, rule, background band, text, and spacing. | The hero flows directly into “Three ways to begin.” The new section boundary feels intentional on desktop, tablet, and mobile. |
| HOME-03 | “A thoughtful next step doesn’t need to be a big one.” beside “Three ways to begin” | Delete the aside text while retaining the “Three ways to begin” label and all three service cards. | The section heading is rebalanced; no empty right column remains. |
| HOME-04 | Three questions displayed simultaneously | Replace the three-column question row with a one-question-at-a-time slider. Retain the marker “QUESTIONS I HEAR EVERY DAY…” and retain the three approved questions verbatim. | Exactly one question is visible at a time. The order is: (1) “Should Mom stay in her home?” (2) “Would downsizing make life easier?” (3) “Where do we even begin?” |
| HOME-05 | Mary section eyebrow: “A clear-eyed, human approach” | Delete the eyebrow only. Retain “Why Families Choose Mary” and the supporting biography. | The heading moves into the lead position with intentional top spacing. |
| HOME-06 | Brokerage mark: “Affiliated brokerage / Cummings & Co. Realtors” | Delete the words “Affiliated brokerage.” Retain the Cummings & Co. logo and the name “Cummings & Co. Realtors.” | The logo and brokerage name remain a quiet secondary endorsement. The legal brokerage disclosure in the footer is unchanged. |
| HOME-07 | Decorative “02” above the closing CTA | Delete “02” while retaining the anchor mark. | No empty number slot or excess gap remains. |
| HOME-08 | Closing CTA: “A conversation can be the beginning / You Don’t Need a Perfect Plan. / Whether you’re thinking…” | Replace the eyebrow, headline, and body with approved positive, forward-looking wording. Retain the “Schedule a Conversation” button. | The revised message emphasizes clarity, choice, and confidence without suggesting that an incomplete plan is the expected starting point. |

## 4. Common-questions slider specification

### 4.1 Content

The fixed marker remains:

> QUESTIONS I HEAR EVERY DAY…

The questions rotate in this order:

1. Should Mom stay in her home?
2. Would downsizing make life easier?
3. Where do we even begin?

### 4.2 Behavior

- Show one question at a time at every viewport size.
- Automatically advance every 5 seconds.
- Use a restrained 350–450 ms slide-and-fade transition: the current question moves slightly upward and fades out; the next enters from below.
- Loop from question three back to question one.
- Pause while the slider is hovered, while any slider control has keyboard focus, and while the browser tab is inactive.
- Provide small, visually quiet position controls and a pause/play control. Controls must be keyboard and touch accessible.
- Reserve enough height for the longest question so transitions never shift the surrounding layout.
- Do not use a continuous marquee, rapid horizontal crawl, or duplicated text track.

### 4.3 Accessibility

- Preserve all three questions in a semantic list for assistive technology; the animated visual copy must not repeatedly interrupt screen readers.
- Give pause/play and question-position controls explicit accessible names and visible focus states.
- Under `prefers-reduced-motion: reduce`, disable automatic advancement and movement. Show the first question by default and allow manual selection without animation.
- Maintain WCAG 2.2 AA text contrast and a minimum 44 × 44 px touch target for interactive controls.

## 5. Closing CTA copy alternatives

### Option A — Recommended

- **Eyebrow:** Your next chapter, thoughtfully planned
- **Headline:** Move Forward With Clarity.
- **Body:** Whether a change is near, years away, or simply taking shape, a thoughtful conversation can help you understand your options and choose what comes next with confidence.

Why this is recommended: it is confident and positive, works whether the eventual decision is to move or stay, and aligns closely with the site’s existing promise of a clear plan.

### Option B

- **Eyebrow:** Start with a conversation
- **Headline:** Let’s Make the Next Step Clear.
- **Body:** Wherever you are in the process, Mary can help you sort through the possibilities, set priorities, and create a plan that feels right for you.

### Option C

- **Eyebrow:** More choices begin with earlier planning
- **Headline:** Plan Today. Choose With Confidence.
- **Body:** Exploring your options now gives you the time and perspective to shape a move—or a decision to stay—around the life you want.

### Option D

- **Eyebrow:** Guidance for what comes next
- **Headline:** A Clearer Path Starts Here.
- **Body:** Bring your questions, your timeline, and what matters most. Together, we’ll turn the possibilities into a thoughtful path forward.

The button remains:

> Schedule a Conversation

## 6. Layout and responsive requirements

- The revised hero caption must remain secondary to the headline and CTA on viewports where it is shown.
- Removing the intro band must reduce page length rather than transfer its height into adjacent padding.
- “Three ways to begin” must retain sufficient separation from the hero and service cards after the intro is removed.
- The questions slider must remain vertically centered and readable at 320, 390, 768, 1024, 1440, and 1920 px widths.
- Removing Mary’s eyebrow and the brokerage label must not create isolated gaps in the right-hand column.
- Removing the closing “02” must keep the anchor centered over the closing CTA.
- The revised closing copy must avoid awkward one-word headline lines and remain within the decorative frame at all supported widths.

## 7. Scope boundaries

### In scope

- Homepage copy and layout changes listed in HOME-01 through HOME-08.
- Slider behavior, controls, responsive styling, and accessibility.
- Cleanup of CSS and component markup made unused by these removals.

### Out of scope

- Changes to the Downsizing Services page or other routes.
- Changes to the three service-card titles, descriptions, or links.
- Changes to Mary’s biography, credentials, portrait, or Cummings & Co. logos.
- Removal of legally necessary brokerage disclosures in the footer.
- Changes to the “Schedule a Conversation” CTA destination or form behavior.

## 8. Validation and acceptance

Implementation is complete only when:

1. All approved deletions are absent from rendered content and source-level homepage copy.
2. No deletion leaves an unintended blank band, orphan rule, or excessive gap.
3. Only one common question is visually displayed at a time.
4. Slider controls work with mouse, touch, keyboard, and reduced-motion settings.
5. The homepage has no horizontal overflow at the required widths.
6. TypeScript validation and the production build pass.
7. The public review link is updated and checked on the Home route before handoff.

## 9. Approval decisions

Approval of this PRD should confirm:

- [x] Retain “30 YEARS” and approve the revised line “Helping Baltimore families make thoughtful real estate decisions.”
- [x] Approve requirements HOME-02 through HOME-08.
- [x] Approve the one-question-at-a-time slider behavior in Section 4.
- [x] Use closing copy **Option A**.
