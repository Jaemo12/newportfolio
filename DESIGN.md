# Design

Recorded from the built site (Nov 2026). Product truth lives in [PRODUCT.md](PRODUCT.md).

## World: bold editorial, lit by one neon sign

A printed-poster feel: huge condensed headlines, full-color fields that change as you scroll, and the neon "Code Sleep / Repeat" sign as the opening moment. The page is a story, not a menu.

## Color

Tokens in `app/globals.css` and named colors in `tailwind.config.ts` (use named colors such as `bg-ink` or `text-bone/70` when you need an opacity; Tailwind cannot apply opacity to `var()`).

| Role | Name | Value |
|---|---|---|
| Dark field | `ink` | `#0b0b0d` |
| Light field | `bone` | `#f1eee6` |
| Secondary text on bone | `bone-dim` | `#5d5a52` |
| Secondary text on ink | `paper-dim` | `#a9a59b` |
| Signal (actions, highlights, the orange field) | `signal`, `signal-soft` | `#ff4d1a`, `#ff7a4d` |

Fields alternate: ink (hero, work, projects, art, socials), bone (about, services), signal (the AI act of the story, and contact). Text on a field is always ink or bone, never gray-on-color.

## Type

Two faces through `next/font` in `app/layout.tsx`:

- **Archivo**, variable with the width axis. Headlines use the `.display` class: weight 800, 62% width, uppercase, 0.9 leading, `clamp(3rem, 9vw, 6rem)`. Body is the normal width.
- **Cedarville Cursive** (`font-script`): the sign, the nav name and the footer name only.

`font-mono` (system) is used only for dates and counters, with `tabular-nums`.

## Structure

Sections live in `app/sections/*.tsx` (not routes); shared pieces in `app/components/`. `app/components/testimonials.tsx` renders nothing until real quotes are added to its list.

1. Hero: name, one line, two actions, three facts, and the neon scene.
2. Marquee ticker of the three roles.
3. **Story** (`app/components/story.tsx`): one pinned 330vh stage. Three statements (quality, AI, art) cross-fade and the whole screen changes field color. A tick bar shows progress.
4. About, Work, Projects, Art, Services, Socials, Contact.

Lists are hairline-ruled rows with a heavy 2px rule on top. Buttons are pills: solid signal or ink, or a 2px outline that fills on hover.

## Play

- Hero (`app/sections/hero.tsx`, `app/components/neonScene.tsx`): a resume-style layout. Name, one line, two actions and three facts on the left; on the right a WebGL scene drawn in one shader: the neon sign on a brick wall that only shows where the sign lights it, above a wet floor that mirrors the sign (smeared vertically, sharp in puddles, rippling). The wall and the reflection flicker with the tube. On phones the scene is a block above the text. Falls back to the CSS sign if WebGL is missing. CTA buttons pull toward the cursor (`magnetic.tsx`).
- Work is a horizontal film strip on wide screens. Each job has a drawn illustration instead of a photo (`scenes.tsx`): a test run ticking green (Cognixia), a growth curve drawing itself (TIMIO), a delivery pipeline with flowing dashes (Cognizant). They lean toward the cursor.
- Projects: each project has a drawn, animated product illustration instead of screenshots (`projectScenes.tsx`): a journal with mood trend (AI Diary), emotion bars and picks (ReviewFlix), ingredients to recipe (RecipeGenius).
- About: a monogram with Ink, Pixels, AI, Testing, React and Next.js orbiting it replaces the stock photo; skills slide and light up on hover; an education timeline draws itself.
- Section headlines rise out of a mask word by word (`headline.tsx`). Konami code triggers confetti. A progress bar and film grain sit over the page.

## Motion

- The sign flickers on.
- The story's scroll-linked cross-fades and a slow parallax on its image.
- Marquee (pauses on hover, stops under reduced motion).
- One fade-and-rise reveal per section.
- Anime dividers (Pikachu, Spirited Away, anime girl, Naruto) stand on a hairline between sections; animations are in `public/anim/*.json` and load near the viewport.

## Do not

- Add a third typeface or a second accent color.
- Add gradient text, kickers above headings, section numbers, glass blur, or hard offset shadows.
- Bring back the fake loader or hidden-until-scroll content.
