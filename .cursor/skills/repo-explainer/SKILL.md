---
name: repo-explainer
description: Explain the current repo to newcomers at a high level. Use when the user asks how the app works, wants onboarding, asks for a walkthrough, wants terms defined, asks what is in the repo, or wants potential areas for deeper explanation.
---

# Repo Explainer

Use this skill to explain the current state of the repo to someone who is not familiar with it.

## Goal

Produce a clear, beginner-friendly map of what is in the repo and how the major pieces fit together. Start high level, define important terms briefly, and offer follow-up paths for deeper dives.

## First Steps

1. Inspect the current repo before answering. Start with:
   - `README.md`
   - `package.json`
   - `env.example`
   - top-level config files such as `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `components.json`, and `proxy.ts` or `middleware.ts`
   - key app entry files under `app/`
   - backend/data folders such as `convex/`
   - shared UI or utility folders such as `components/` and `lib/`
2. Search for important implementation signals before explaining:
   - dependencies and scripts in `package.json`
   - route files, layouts, providers, and middleware/proxy files
   - backend schema, API functions, generated clients, auth config, and env variable names
   - feature-specific folders or files that appear to be custom app work
3. If discussing Convex code or patterns, also read `convex/_generated/ai/guidelines.md` when present.
4. Do not read or quote secret values from `.env.local`. Use `env.example` and variable names instead.

## Explanation Structure

Default to a concise high-level walkthrough. Use this order unless the user asks for a narrower answer:

1. **What this repo is**: One short paragraph describing the app/template in its current state.
2. **Main building blocks**: Explain the major technologies and only define terms that appear in this repo.
3. **How the app is organized**: Describe the main directories and responsibilities.
4. **How a request flows**: Explain the path from browser to app shell, auth, UI, and backend/data services where applicable.
5. **How development works**: Explain install/dev/build scripts, generated files, and env vars at a high level.
6. **What is already implemented vs. still blank**: Distinguish actual app features from starter wiring.
7. **Possible deeper dives**: End with a short menu of useful follow-up areas.

## Deeper Dive Menu

End with 3-6 specific avenues the user can ask about next, based on the actual repo. Examples:

- "Auth flow: how Clerk signs users in and how that reaches the backend"
- "Data layer: how Convex schema, queries, mutations, and generated APIs work"
- "Frontend structure: how the App Router, layouts, pages, and UI components fit together"
- "Environment setup: which variables are needed locally and in production"
- "Adding a feature: which files you would touch to add a real product workflow"
- "Deployment: what has to be configured for Vercel, Convex, and Clerk"

## Tone and Depth

- Assume the user is smart but new to this repo.
- Define jargon briefly, then move back to the concrete repo.
- Prefer concrete examples from this codebase over abstract framework descriptions.
- Keep the first answer approachable and high level. Do not explain every file unless asked.
- Use file references like `app/layout.tsx`, `convex/schema.ts`, or `proxy.ts` when those files exist and matter.
- Do not dump large code blocks. Quote small snippets only when they clarify the explanation.

## Accuracy Checks

Before finishing, verify these points against the current repo:

- Which package manager the repo appears to use.
- Which frameworks/services are actually installed and wired up.
- Which app routes, providers, and middleware/proxy files exist.
- Whether backend/data functions exist or the repo is still mostly scaffold.
- Which env vars are documented, without exposing local secret values.
- Which files are generated and should not be edited by hand.

## Avoid

- Do not claim the app has implemented business features that are not in the repo.
- Do not imply `convex/_generated/` should be edited by hand.
- Do not expose local secrets or values from `.env.local`.
- Do not turn the walkthrough into a code review unless the user asks for risks or improvements.
