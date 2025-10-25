# Check the env.example for the keys you need to set up. 
Change the file name to `.env.local`

1. Do `pnpm install` to download required packages.
2. Do `npx convex dev` to create an instance of convex database

# SaaS Template - Next.js + Convex + Clerk

A modern SaaS starter template with authentication, real-time database, and a built-in notes application.

## Features

- **Authentication**: Clerk integration for secure user management
- **Real-time Database**: Convex backend with automatic syncing
- **Notes App**: Create, edit, and delete plain-text notes
- **Protected Routes**: Authentication-required pages
- **Modern UI**: shadcn/ui components with Tailwind CSS
- **Toast Notifications**: Sonner for user feedback

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
3. Copy your keys to `.env.local`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Public key from Clerk
   - `CLERK_SECRET_KEY` - Secret key from Clerk
   - `CLERK_JWT_ISSUER_DOMAIN` - Create a JWT template using the `Convex` template
   - `CLERK_FRONTEND_API_URL` - Your Clerk frontend API URL

#### Convex Setup
1. `npx convex dev`

This will:
- Create your database schema
- Generate TypeScript types
- Start watching for file changes

### 2. Configure Clerk with Convex

1. In Convex dashboard, go to your project settings
2. Add your Clerk JWT issuer domain to the authentication provider settings
3. Ensure the JWT template application ID is set to "convex"

### 3. Run the Application

In a new terminal, run both servers in parallel:

```bash
pnpm dev:all
```

The app will be available at `http://localhost:3000`

### 6. Test the Setup

1. Navigate to `http://localhost:3000`
2. Sign up or sign in with Clerk
3. Click "Notes" in the header
4. Create your first note!

## Project Structure

```
├── app/
│   ├── notes/                      # Notes feature
│   │   ├── page.tsx               # Notes page (protected)
│   │   └── _components/
│   │       ├── NotesList.tsx       # Notes list with create button
│   │       └── NoteSheet.tsx       # Create/edit note form in sheet
│   ├── protected/                 # Example protected page
│   ├── layout.tsx                 # Root layout with auth & navigation
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
├── convex/
│   ├── schema.ts                  # Database schema definition
│   ├── notes.ts                   # Notes CRUD functions
│   ├── auth.config.ts             # Clerk authentication config
│   ├── tasks.ts                   # Example task functions
│   └── _generated/                # Auto-generated types (DO NOT EDIT)
├── components/ui/                 # shadcn/ui components
├── env.example                    # Environment variables template
├── package.json
└── README.md
```

## Available Scripts

```bash
# Development
pnpm dev              # Start Next.js dev server
pnpm convex:dev       # Start Convex dev server
pnpm dev:all          # Run both servers concurrently
```

# Prod deployment 
**Convex**:
```bash
npx convex deploy
```

**Next.js** (Vercel):
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

**Clerk**:
- Set production URLs in Clerk dashboard
- Update JWT template domain if needed

# Lost?
If you get stuck with the Convex/Clerk stuff I'd reference this: https://docs.convex.dev/auth/clerk or https://clerk.com/docs/guides/development/integrations/databases/convex

General Convex set up for nextjs docs: https://docs.convex.dev/quickstart/nextjs

General Clerk set up for nextjs docs: https://clerk.com/docs/nextjs/getting-started/quickstart


# Extending the template:

I made this repo so that everything is set up to have user authentication and secure data retrieval based on logged in user.

To create your own app using this template I would tell AI that this is a template and the notes schema and queries is just an example. Tell AI to about your application idea, what data tables you need, and your schema and let it run.