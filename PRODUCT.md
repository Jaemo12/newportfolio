# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Hiring managers and recruiters** evaluating Amit Samant for a full-time engineering role. They skim work history, scan for shipped results, and want the resume (`public/resume.pdf`) and LinkedIn/GitHub within reach.
- **Freelance clients** (founders, small businesses, individuals) deciding whether to commission web, mobile, API, cloud, UI/UX, or digital-art work. They want to see what Amit offers, judge quality from past work, and start a conversation.

## Product Purpose

A single-page personal portfolio for Amit Samant (Arlington, Texas) that turns a visit into either a job conversation or a project inquiry. Success is a recruiter reaching out or downloading the resume, or a client sending a message through the contact form.

## Positioning

Three claims, held together, that a generic full-stack portfolio can't make:

- **Engineer and artist.** Technical depth alongside a real art practice, shown in the Art Portfolio and offered as commissioned digital art.
- **AI product builder.** A Master's in Artificial Intelligence (Texas A&M University–Corpus Christi, 2022–2024) plus shipped AI products: AI Diary / MindScape, ReviewFlix, RecipeGenius, and the TIMIO AI Chrome extension.
- **Quality and full stack.** Builds the product end to end and leads quality engineering (currently Quality Engineering Lead at Cognixia), so the work ships reliably.

## Operating Context

- Visitors usually arrive from a resume, LinkedIn, GitHub, a job application, or a shared link, and often skim on a phone before a closer desktop read.
- Recruiters compare this against many other candidates' portfolios in one sitting.
- The contact form posts to `app/api/send-email/route.ts` (Nodemailer). The README says EmailJS; the code is the source of truth.
- Deployed on Vercel.

## Capabilities and Constraints

- Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS. Motion and 3D: Framer Motion, GSAP, Lenis smooth scroll, three.js / react-three-fiber, OGL, Lottie.
- One page of sections: loading screen → Hero → About (skills, education) → Work Experience → Projects → Art → Services → Socials → Contact → Footer.
- Section components live under `app/<section>/page.tsx` and are imported into `app/page.tsx`, so they also exist as stray routes.
- The home page waits on a fixed 3-second simulated loading screen before showing content.

## Brand Commitments

These must be kept by any redesign:

- **Anime and Lottie personality**: the Naruto, Pikachu, Spirited Away, anime-girl, and SpaceMan animations are part of who Amit is, not decoration to cut.
- **Art section** stays a first-class part of the site.
- **Services offering** stays: web development, mobile apps, APIs, cloud, custom digital art, UI/UX design.
- **Project origin stories**: each project opens with the real conversation that sparked it (a friend journaling, a movie-buff friend, a cousin learning to cook).
- Voice: first person, warm, curious. The bio mentions "roots in the Himalayas and wings that have taken me across continents."

## Evidence on Hand

- **Work history** (`app/workex/page.tsx`): Cognixia, Quality Engineering Lead (Feb 2025–present), manual testing cycles cut by 35% and test coverage up 30%; TIMIO, AI Chrome Extension Architect (May 2024–Feb 2025), 45% increase in daily active users; Cognizant, Senior Software Engineer (Jul 2020–May 2022), deployment efficiency up more than 50%.
- **Education**: M.S. Artificial Intelligence, Texas A&M University–Corpus Christi (2022–2024); B.S. Computer Science, DIT University, India (2016–2020).
- **Projects** with screenshots in `public/`: AI Diary (`aiDiary1–13.png`, `aidiary.png`), ReviewFlix, RecipeGenius (`recipe.png`).
- **Artwork**: `public/artwork1–4`. **Photos**: `public/photo1–6`, hero imagery, and videos.
- **Resume**: `public/resume.pdf`.
- **Links**: GitHub (Jaemo12), LinkedIn (amitsamant12), Twitter, Instagram, Facebook.
- **Not on hand**: no client testimonials, freelance case studies, pricing, or press. Future work must not invent them.

## Product Principles

1. **Serve both readers fast.** A recruiter and a client should each find their next step (resume or message) without digging through the other's path.
2. **Proof over adjectives.** Lead with shipped work, real metrics, and real art, not self-description.
3. **Personality is the differentiator.** The anime, art, and origin stories are what make this portfolio memorable. Keep them.
4. **Spectacle must not block content.** Motion and 3D should support the work, not stand between a visitor and it.
