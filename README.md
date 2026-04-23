# SaaS Template - Next.js + Convex + Clerk

A minimal SaaS starter that wires up authentication (Clerk) and a real-time
database (Convex) with Next.js 16 and shadcn/ui. It ships as a blank
skeleton ready for you to add your own schema, queries, and pages.

## Features

- **Authentication**: Clerk integration for secure user management
- **Real-time Database**: Convex backend with automatic syncing
- **Clerk ↔ Convex bridge**: `ConvexProviderWithClerk` pre-wired so Convex
  queries and mutations know who the current user is
- **shadcn/ui + Tailwind v4**: starter setup with a `Button` component
- **Toast Notifications**: Sonner pre-mounted in the root layout

## Prerequisites

- Node.js 18+ with pnpm
- Clerk account (https://clerk.com)
- Convex account (https://convex.dev)

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

Copy `env.example` to `.env.local`:

```bash
cp env.example .env.local
```

Then fill in the required values:

#### Clerk Setup
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Create a JWT template using the `Convex` template
4. Copy your keys to `.env.local`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Public key from Clerk
   - `CLERK_SECRET_KEY` - Secret key from Clerk
   - `CLERK_JWT_ISSUER_DOMAIN` - Issuer domain from your Convex JWT template
   - `CLERK_FRONTEND_API_URL` - Your Clerk frontend API URL

#### Convex Setup

```bash
npx convex dev
```

This will:
- Provision a Convex deployment
- Generate TypeScript types in `convex/_generated/`
- Watch for file changes

### 3. Configure Clerk with Convex

1. In the Convex dashboard, open your project settings
2. Add `CLERK_JWT_ISSUER_DOMAIN` as an environment variable
3. Ensure the JWT template application ID is set to `convex`

### 4. Run the Application

Run both the Next.js and Convex dev servers in parallel:

```bash
pnpm dev:all
```

The app will be available at `http://localhost:3000`.

### 5. Verify

1. Navigate to `http://localhost:3000`
2. Sign up / sign in with Clerk using the header buttons
3. The `UserButton` should render once signed in

## Project Structure

```
├── app/
│   ├── ConvexClientProvider.tsx   # Bridges Clerk auth into Convex
│   ├── layout.tsx                 # Root layout with ClerkProvider + header
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles (Tailwind v4)
├── convex/
│   ├── schema.ts                  # Empty schema — add your tables here
│   ├── auth.config.ts             # Clerk authentication config
│   └── _generated/                # Auto-generated types (DO NOT EDIT)
├── components/ui/                 # shadcn/ui components (starter: button)
├── lib/utils.ts                   # `cn()` helper
├── proxy.ts                       # Clerk middleware (Next.js 16 `proxy.ts`)
├── env.example                    # Environment variables template
├── package.json
└── README.md
```

## Available Scripts

```bash
pnpm dev              # Start Next.js dev server
pnpm convex:dev       # Start Convex dev server
pnpm dev:all          # Run both servers concurrently
pnpm build            # Build Next.js for production
pnpm start            # Run the built Next.js app
pnpm lint             # Run ESLint
```

## Production Deployment

**Convex**:
```bash
npx convex deploy
```

**Next.js** (Vercel):
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in the Vercel dashboard
4. Deploy

**Clerk**:
- Set production URLs in the Clerk dashboard
- Update the JWT template domain if needed

## Lost?

- Convex + Clerk: https://docs.convex.dev/auth/clerk
- Clerk + Convex: https://clerk.com/docs/guides/development/integrations/databases/convex
- Convex + Next.js quickstart: https://docs.convex.dev/quickstart/nextjs
- Clerk + Next.js quickstart: https://clerk.com/docs/nextjs/getting-started/quickstart

## Extending the Template

This repo is intentionally bare — auth and the Clerk↔Convex bridge are
wired up, and everything else is left for you to build. To use it as a
template with an AI assistant, describe your application idea and the
tables you need, then let it add the Convex schema, queries/mutations,
and UI.
