# Home and Downsizing Design Remediation Requirements

**Status:** Implemented and locally verified  
**Prepared:** August 16, 2026  
**Routes:** `/` and `/downsizing-services`  
**Source of truth:** The current local working copy. The Manus preview captured during the audit is an older deployment and must not be treated as the implementation baseline.

## 1. Purpose

Remediate every material visual, responsive, accessibility, interaction, and image-performance defect identified in the full Home and Downsizing Services audit while preserving the approved Harbor House editorial direction: Baltimore navy, warm cream, antique gold, restrained motion, serif-led headlines, and generous but intentional spacing.

The finished pages must remain composed and readable from 320 px mobile screens through 1920 px desktops. Breakpoint transitions must be continuous: a layout may reorganize, but it must not become cramped, lose a call to action, obscure content, or create large accidental voids immediately above or below a breakpoint.

## 2. Audit Baseline

The baseline audit covered:

- Home at 14 viewport sizes from 320 to 1920 px.
- Downsizing Services at 17 viewport sizes from 320 to 1920 px.
- Closed and open mobile navigation states.
- Short laptop, portrait tablet, mobile, desktop, and ultrawide compositions.
- Actual hero, room, and Mary portrait imagery.
- Text wrapping, clipping, image crops, spacing, contrast, hit targets, semantic states, and page-level overflow.
- The local working copy and the older deployed Manus preview.

The implementation must be evaluated against the current local copy. After approval, the Manus preview should be rebuilt so that stakeholder review is not performed against stale content or CSS.

## 3. Scope

### 3.1 In scope

- Responsive layout and breakpoint behavior on the Home and Downsizing Services routes.
- Shared header and footer behavior used by those routes.
- Home and Downsizing hero sizing, wrapping, overlays, image positioning, and text contrast.
- Navigation availability, stable ordering, current-page indication, mobile-menu behavior, and CTA presentation.
- Empty testimonial handling.
- Home way cards, resource cards, credentials, closing CTA, and compact footer layouts.
- Downsizing plan, destination, steps, small-start, help, questions, resources, final CTA, and footer sections.
- Editorial marker consistency on the two routes.
- WCAG 2.2 AA color contrast, keyboard behavior, semantics, focus visibility, and touch-target sizing for affected components.
- Optimization and correct delivery of the three largest audited images.
- Verification at all viewports in the matrix in Section 6.

### 3.2 Shared-component constraint

`SiteHeader`, `SiteFooter`, `Brand`, and `ButtonLink` are shared by other routes. Necessary shared changes are in scope, but they must not create visual or functional regressions on Aging in Place, Buying & Selling, Resource Center, Meet Mary, or Contact.

## 4. Non-goals

- A brand redesign, new color palette, new type system, or wholesale page rewrite.
- Inventing testimonials, client quotations, attributions, credentials, or brokerage assets that have not been approved.
- Changing Mary’s contact information, Calendly destination, service claims, or legal copy.
- Replacing Mary’s portrait photography; the audited portrait crops are acceptable.
- Building new service functionality, lead forms, a CMS, analytics, or resource downloads.
- Publishing to production without separate deployment authorization. The result must, however, be build-ready and include a clear deployment-verification step.
- Removing the existing Manus badge through page CSS. If the hosting platform displays it in production, overlap must be checked in the deployment environment.

## 5. Priority Definitions

- **P0 — Release blocker:** A primary action disappears, content becomes unreadable, a common viewport is structurally broken, or keyboard/touch access fails.
- **P1 — Required:** Material visual, responsive, accessibility, or performance defect that must be corrected before acceptance.
- **P2 — Polish:** Noticeable inconsistency or excess space that degrades quality but does not block task completion.

## 6. Required Viewport Matrix

Every exact width below is intentional. The close pairs exercise known cascade cliffs and must not be replaced by a few generic presets.

| Class | Viewport(s) | Required emphasis |
| --- | --- | --- |
| Small mobile | 320×568, 375×667, 390×844 | Headline wrap, text contrast, one-column cards, footer, tap targets |
| Large mobile | 430×932, 481×900 | Card arrows, CTA centering, menu composition |
| Small tablet | 600×900, 700×900, 701×900 | Mobile CTA continuity, grid transitions, step-card behavior |
| Portrait tablet | 768×1024, 820×1180, 821×1000, 834×1112 | The former breakpoint cliff, image/copy proportions, navigation |
| Compact laptop | 900×900, 1024×768, 1100×800 | Header crowding, footer wrapping, two-panel layouts |
| Standard desktop | 1280×720, 1440×900, 1600×900 | Hero fold, complete grids, section rhythm |
| Ultrawide | 1920×1080 | Home hero line count and height, content containment |

Global acceptance at every matrix size:

1. `document.documentElement.scrollWidth` must not exceed `window.innerWidth` by more than 1 px.
2. No visible text, image label, icon, focus ring, or CTA may be clipped by an ancestor with `overflow: hidden`.
3. No text may overlap another text block, a card control, or an icon.
4. No functional control may disappear within a one-pixel breakpoint transition.
5. All page content must remain usable at 200% browser zoom and at 320 CSS px width.

## 7. Functional and Responsive Requirements

### NAV-01 — Stable primary navigation (**P1**)

All seven primary navigation items must remain in the same order on every route. The current route must remain visible and be styled as current instead of being removed.

Acceptance criteria:

- Home, Downsizing Services, Aging in Place, Buying & Selling, Resource Center, Meet Mary, and Contact remain present in stable order.
- The current link uses `aria-current="page"` and has a visible, non-color-only state.
- Moving between Home and Downsizing does not shift the position of the other navigation items.
- The current-page link is not a dead keyboard trap and may safely link to its own route.

### NAV-02 — Continuous header CTA availability (**P0**)

“Talk to Mary” must be available at every supported width, including the former 701–820 px gap on Downsizing.

Acceptance criteria:

- At every matrix width, the CTA is either visible in the header or visible in the open mobile menu.
- No width from 320 through 1920 px produces both a hidden desktop CTA and a hidden mobile CTA.
- In a mobile menu, the CTA uses the same intentional horizontal inset as the menu links, has usable horizontal padding, and is not accidentally styled as a divider row.
- The open-menu CTA is visually prominent and at least 44 px tall.

### NAV-03 — Responsive navigation transition (**P0**)

The desktop header must switch to the compact menu before navigation labels become crowded or clipped.

Acceptance criteria:

- The Home label “Downsizing Services” has at least 8 px of unused inline space within its desktop navigation cell.
- The compact header is active by 900 px. Desktop navigation may remain above 900 px only where every label fits without compression or clipping.
- The 900, 820, 801-equivalent behavior represented by the matrix is visually continuous; no label is concealed by page-level overflow.

### NAV-04 — Mobile-menu semantics and operation (**P0**)

Acceptance criteria:

- Menu buttons expose `aria-expanded` and an `aria-controls` value matching the menu element’s `id`.
- The accessible name changes appropriately between “Open menu” and “Close menu.”
- The menu opens and closes with pointer activation, Enter, and Space.
- Escape closes an open menu and returns focus to the menu button.
- Activating a menu link closes the menu.
- The menu button’s clickable box is at least 44×44 CSS px on Home and Downsizing.
- A visible keyboard focus indicator with at least 3:1 contrast is present.

### RSP-01 — Downsizing tablet architecture (**P0**)

The desktop multi-panel and multi-column arrangements must reorganize before they compress into narrow columns.

Acceptance criteria:

- At 821, 834, 900, and 1024 px, no plan question, help item, step card, or possibility item is rendered in a column narrower than 160 px.
- At widths of 1024 px and below, the Destination and Help image/copy panels stack vertically rather than remaining in a 50/50 split.
- At 701–1024 px, plan questions use no more than two columns, steps use two columns, and help items use no more than two columns.
- At 700 px and below, step cards use one column.
- The layouts at 820 and 821 px differ only as required by available space; there is no abrupt jump from compressed desktop columns to an entirely different scale.
- Mary’s image panel does not contain a visibly undersized portrait surrounded by a large accidental void.

### RSP-02 — Complete and balanced Downsizing grids (**P1**)

Acceptance criteria:

- The eight step cards form complete rows: four columns at wide desktop where space permits, two columns at tablet/compact desktop, and one column on mobile.
- The ninth Destination possibility does not appear as an arbitrary half-width orphan. It either participates in a three-column wide layout or spans the available row in a deliberate way.
- Card heights in the same row are visually aligned, but fixed minimum heights must not create more than 48 px of unused vertical space beneath the shortest card’s content.
- No grid leaves a blank cell that reads as missing content.

### RSP-03 — Compact footer behavior (**P1**)

Acceptance criteria:

- Footer links, copyright, and brokerage disclaimer remain grouped and intentionally aligned at 900, 820, and 768 px.
- Footer rows stack before copy wraps into isolated fragments.
- No legal sentence overlaps another item or becomes narrower than 240 px unless the viewport itself is narrower.
- The mobile footer remains free of host-badge overlap when verified on the deployment target.

## 8. Home Page Visual Requirements

### HOME-01 — Ultrawide hero containment (**P0**)

Acceptance criteria:

- From 1024 through 1920 px, “A Clear Plan for What Comes Next.” occupies no more than three visual lines.
- At 1920×1080, the hero is no taller than 900 px and does not grow merely because the headline font size increases.
- Both body paragraphs, the CTA, and the hero caption remain inside the hero with intentional paragraph rhythm and at least 32 px from the next section boundary.
- The CTA never spills onto the cream Intro section.
- Font scaling is fluid and bounded; increasing viewport width must not increase the headline’s line count.

### HOME-02 — Hero image crop and contrast (**P0**)

Acceptance criteria:

- White and gold hero text meet the contrast thresholds in ACC-01 at every point occupied by glyphs, including over the illuminated window and white trim.
- Mobile uses an image position and overlay that preserve a recognizable house focal point without placing text over the brightest architectural details.
- The overlay transition has no visible hard band and does not fade so far beneath the text that contrast becomes image-dependent.
- The image remains sharp and proportionate without stretching.

### HOME-03 — Empty testimonials (**P1**)

No testimonial placeholder may render until approved testimonials exist.

Acceptance criteria:

- When `testimonials.length === 0`, the entire testimonial section returns no visible layout and reserves 0 px of height.
- No blank ruled slots, testimonial heading, or empty landmark is exposed visually or to assistive technology.
- When testimonials are later supplied, the existing populated presentation remains usable and accessible.
- No testimonial copy or attribution is invented as part of this remediation.

### HOME-04 — Way-card vertical rhythm (**P1**)

Acceptance criteria:

- When way cards stack, desktop `min-height` and paragraph-height reservations are removed.
- No stacked card contains more than 48 px of unexplained blank space between its content and action.
- Card actions remain aligned where cards share a row, without forcing excessive height when they do not.

### HOME-05 — Resource-card arrow clearance (**P0**)

Acceptance criteria:

- Resource-card body copy reserves sufficient right and bottom space for the diagonal arrow.
- There is at least 12 px between the text’s painted bounds and the arrow’s painted bounds.
- This is specifically verified for ADUs at 1024 and 320 px, Lifestyle Communities at 481 px, and Probate Resources at 320 px.
- The entire card remains a single clear link with a visible focus state.

### HOME-06 — Closing CTA alignment (**P1**)

Acceptance criteria:

- At widths of 480 px and below, the closing CTA button is horizontally centered with the centered heading and supporting paragraph.
- The button center differs from the content-column center by no more than 2 px.
- At 320 px, the button does not overflow and its label does not collide with the arrow.

### HOME-07 — Credentials balance (**P2**)

Acceptance criteria:

- The five text-only credentials do not leave a visually confusing empty grid cell.
- The final item is centered or deliberately spans the row at widths where a two-column grid would otherwise orphan it.
- Text remains left-readable and meets ACC-01.

## 9. Downsizing Page Visual and Interaction Requirements

### DOWN-01 — Hero contrast and overlay (**P0**)

Acceptance criteria:

- The `ds-eyebrow--light` treatment cannot be overridden by the generic dark eyebrow rule; it uses an AA-compliant light/gold value over the hero.
- The headline and both paragraphs remain readable over the pale sofa at every matrix width.
- Normal-size text meets 4.5:1 and large text meets 3:1 against the composited photograph and overlay.
- On mobile, the content does not extend into a portion of the image where the overlay has faded below the contrast requirement.
- The image crop remains intentional and does not stretch.

### DOWN-02 — Destination image label (**P0**)

Acceptance criteria:

- “A POSSIBLE NEXT HOME” remains readable over the bright window and curtain at mobile, tablet, and desktop widths.
- The label has a localized scrim, gradient, or equivalent treatment that guarantees at least 4.5:1 contrast for its 14 px text.
- The treatment is visually integrated and does not obscure more of the photograph than necessary.

### DOWN-03 — Step cards are not false controls (**P0**)

The preferred remediation is to present the eight cards as static informational articles because their full copy is already displayed.

Acceptance criteria:

- Step descriptions are fully opaque and readable without hover, click, or keyboard activation.
- Static cards have no `role="button"`, `tabIndex`, click handler, key handler, open state, or control-like cursor.
- If a true disclosure is introduced instead, collapsed content must actually be hidden, the control must use `aria-expanded`/`aria-controls`, and keyboard behavior must follow the disclosure pattern. A border-only state change is not acceptable.
- Pointer, touch, keyboard, and no-hover environments expose the same information.

### DOWN-04 — Destination and Help composition (**P1**)

Acceptance criteria:

- At 1024 px and below, image and copy stack in a coherent reading order.
- Mary’s portrait remains naturally cropped, centered, and large enough to read as the visual anchor of its panel.
- Help-list labels do not wrap into columns narrower than 160 px.
- At mobile widths, image heights are bounded so the user does not encounter a large empty photographic band before the copy.

### DOWN-05 — Section pacing (**P1**)

Acceptance criteria:

- The gap from the final line in the dark “A Gentler Place to Begin” section to the section boundary is no more than 72 px on desktop/tablet and 56 px on mobile.
- Mobile sections do not retain desktop `min-height` values solely to create empty space.
- Vertical padding scales down consistently below 700 px while preserving at least 48 px between major sections.
- No section appears empty or unfinished.

### DOWN-06 — Mobile resource and question density (**P2**)

Acceptance criteria:

- Question and resource cards remain comfortably scannable at 320–430 px without desktop-sized vertical padding.
- Repeated single-column cards use consistent gaps and do not create accidental 100+ px voids.
- Icons, headings, descriptions, and section actions stay aligned to the same mobile content inset.

## 10. Editorial Requirements

### EDIT-01 — Marker consistency (**P1**)

Acceptance criteria:

- Remove the small-print `02 /` prefix from Home’s “QUESTIONS I HEAR EVERY DAY…” marker while retaining the descriptive label.
- Remove the decorative `02` from Home’s closing CTA while retaining its anchor mark and “A conversation can be the beginning” label.
- Remove the `02 /` prefix from Downsizing’s “A POSSIBLE NEXT HOME” image label unless a visible and logically preceding `01` marker is restored. The preferred remediation is removal.
- Home must not present either affected area as part of an incomplete or competing numbered sequence.

### EDIT-02 — Approved copy preservation (**P1**)

Acceptance criteria:

- Existing approved service copy, CTA labels, contact details, and legal language remain unchanged except for the marker edits above and minor accessible labels.
- Curly punctuation and typographic emphasis remain intact.
- No placeholder testimonial language is introduced.

## 11. Accessibility Requirements

### ACC-01 — Color contrast (**P0**)

Acceptance criteria:

- Normal text below 24 px (or below 18.66 px bold) meets at least 4.5:1 contrast.
- Large text meets at least 3:1.
- Meaningful icons and focus indicators meet at least 3:1 against adjacent colors.
- The following known failures are explicitly corrected and measured:
  - Home section-heading aside (audited at approximately 3.18:1).
  - Home credentials (approximately 3.95:1).
  - Home footer legal copy (approximately 4.37:1).
  - Downsizing hero eyebrow (approximately 1.8–2.34:1 in the local cascade).
  - Downsizing step descriptions (approximately 2.37:1).
  - Downsizing section-support copy (approximately 4.33:1).
  - Downsizing footer legal copy (approximately 4.14:1).
  - Downsizing destination image label over the actual photo.
- Contrast is measured against the final composited background, not merely the declared solid color.

### ACC-02 — Reflow and text resizing (**P0**)

Acceptance criteria:

- At 200% browser zoom, content reflows without horizontal page scrolling or loss of information.
- Text spacing overrides equivalent to WCAG 1.4.12 do not cause clipping or overlap.
- Fixed heights are not used on text-bearing containers unless overflow is impossible with the approved copy and spacing overrides.

### ACC-03 — Semantics and keyboard support (**P0**)

Acceptance criteria:

- Navigation remains inside named `nav` landmarks.
- Current-page state, menu state, and any remaining disclosure state are exposed programmatically.
- Decorative anchors/icons are hidden from assistive technology where appropriate.
- Every interactive element is reachable and operable by keyboard in logical document order.
- Static cards are not added to the tab order.

### ACC-04 — Touch targets and focus (**P0**)

Acceptance criteria:

- Menu toggles and all primary CTAs provide a minimum 44×44 CSS px target.
- Adjacent mobile targets have at least 8 px of separation or otherwise comply with WCAG target-spacing exceptions.
- Focus styles are not clipped by card or page overflow.

## 12. Performance and Media Requirements

### PERF-01 — Large-image optimization (**P1**)

The original audited hero/room assets ranged from approximately 2.3 to 3.5 MB, and two `.jpeg` paths contained PNG-encoded data. Deliver correctly encoded optimized files.

Acceptance criteria:

- Home hero is a correctly encoded JPEG/WebP/AVIF no larger than 700 KB.
- Downsizing hero is a correctly encoded JPEG/WebP/AVIF no larger than 450 KB.
- Downsizing room image is a correctly encoded JPEG/WebP/AVIF no larger than 450 KB.
- File extension, MIME type, and encoded format agree.
- Optimized assets preserve the source aspect ratio and show no obvious banding, block artifacts, or detail loss at 1920 px review.
- The application no longer requests the multi-megabyte originals for these three placements.

### PERF-02 — Stable image layout and loading priority (**P1**)

Acceptance criteria:

- Above-the-fold hero imagery is discoverable immediately and is not lazy-loaded.
- Below-the-fold `<img>` elements use intrinsic `width`/`height` or an equivalent CSS `aspect-ratio` so their layout is reserved before download.
- Below-the-fold portraits may be lazy-loaded, but must not pop into an incorrectly sized container.
- No image request returns 404 in the production build or preview.

### PERF-03 — Motion and loading resilience (**P2**)

Acceptance criteria:

- Critical copy is visible without waiting for animation completion.
- `prefers-reduced-motion: reduce` does not conceal or delay content.
- Slow image loading leaves a deliberate background color rather than unreadable text on transparency.

## 13. Implementation Constraints

- Prefer focused changes to existing React and CSS rather than introducing a new styling framework.
- Keep the final remediation rules together in one clearly labeled block so the winning source order and specificity are understandable.
- Do not solve overflow by globally hiding content.
- Do not use viewport-specific one-off pixel offsets where a grid, flex, `clamp()`, `minmax()`, or content-width correction will solve the system-level problem.
- Preserve existing deep links, route paths, and Calendly behavior.
- Keep unrelated user changes intact.
- Changes to shared components must be smoke-tested on every route listed in Section 3.2.

## 14. Verification Plan

### 14.1 Static and build verification

Run from the repository root:

1. `corepack pnpm check`
2. `corepack pnpm build`
3. Confirm the build emits no missing-asset errors.
4. Confirm optimized file types and byte sizes independently of filename extensions.
5. Search rendered/source markup for obsolete false-control attributes on Downsizing step cards.

Both commands must exit successfully. Existing non-fatal platform/runtime notices must be documented separately from regressions introduced by this work.

### 14.2 Responsive visual verification

For both routes at every viewport in Section 6:

1. Capture a full-page screenshot after fonts and images settle.
2. Inspect header closed state, then open-menu state wherever the compact header is active.
3. Inspect every section boundary, card grid, image crop, text wrap, and footer.
4. Measure page-level and component-level overflow.
5. Compare the 700/701 and 820/821 pairs side-by-side for breakpoint continuity.
6. Compare the Home hero at 1024, 1440, 1600, and 1920 px to confirm that wider screens do not create more headline lines.

### 14.3 Accessibility verification

1. Keyboard-only pass: Tab, Shift+Tab, Enter, Space, and Escape through both pages and mobile menus.
2. Verify focus order and visible focus rings.
3. Inspect the accessibility tree for current-page navigation and menu state.
4. Measure all colors named in ACC-01 using the final composited backgrounds.
5. Repeat at 200% zoom and with enlarged text spacing.
6. Enable reduced motion and verify immediate access to all content.

### 14.4 Performance verification

1. Use the browser network panel with cache disabled.
2. Confirm the optimized hero and room assets are the files requested.
3. Record transferred byte size and verify PERF-01 budgets.
4. Throttle to a mobile network profile and confirm text remains readable while images load.
5. Check that below-fold image allocation prevents noticeable layout shift.

### 14.5 Shared-route regression pass

At minimum, open Aging in Place, Buying & Selling, Resource Center, Meet Mary, and Contact at 390, 834, 1024, and 1440 px. Confirm:

- Header/navigation remain usable.
- Current-page state is correct.
- CTA and mobile-menu styling are not broken.
- Shared footer content remains aligned.
- No new horizontal overflow is introduced.

### 14.6 Deployment parity check

After an authorized deployment:

- Confirm the preview serves the same copy, marker changes, optimized asset names, and responsive CSS as the accepted local build.
- Hard-refresh at 390, 834, 1440, and 1920 px.
- Verify the hosting badge, if present, does not cover footer content or controls.

## 15. Definition of Done

The remediation is complete only when:

- Every P0 and P1 requirement passes.
- P2 requirements are completed or explicitly recorded as deferred with owner approval.
- TypeScript check and production build pass.
- Full-page visual inspection is complete for both routes at every matrix viewport.
- There is no page-level horizontal overflow and no known text/icon collision.
- All enumerated contrast failures meet WCAG 2.2 AA.
- The Downsizing CTA is continuously available from 320 through 1920 px.
- The 821–1024 px Downsizing layout no longer uses compressed desktop grids.
- The Home ultrawide hero remains contained and uses no more than three headline lines.
- Empty testimonial content reserves no space.
- Optimized media meets the specified format and size budgets.
- Shared routes pass the regression smoke test.
- The final implementation summary identifies changed files, verification results, and any platform-only deployment follow-up.

## 16. Local Implementation Record

- TypeScript check: passed.
- Production build: passed; only the pre-existing unset analytics-variable notices remain.
- Responsive acceptance matrix: passed at all 19 required viewports on both routes with no page overflow, card-arrow collision, hero spill, false step-card control, or breakpoint failure.
- Compact navigation: verified across Home, Downsizing, Aging in Place, Buying & Selling, Resource Center, Meet Mary, and Contact.
- Contrast: known solid-color failures now measure from 4.94:1 to 14.4:1; hero overlays were strengthened against the actual imagery.
- Media: all three optimized assets meet the specified format and byte budgets and are included in the production output.
- Deployment parity: pending a separately authorized deployment of this working copy.
