# Convex + Clerk Patterns

Quick reference for common patterns in this stack. See the [Convex docs](https://docs.convex.dev) for full details.

## Schema

Define tables in `convex/schema.ts`:

```ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    tokenIdentifier: v.string(),
    title: v.string(),
    content: v.string(),
    isPublic: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_isPublic", ["isPublic", "createdAt"]),
});
```

## Auth Patterns

### Required auth — user must be signed in

```ts
import { query } from "./_generated/server";

export const getMyData = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    // tokenIdentifier is Convex's stable auth identity key.
    return await ctx.db
      .query("posts")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .take(50);
  },
});
```

### No auth — public data, anyone can call

```ts
export const listPublicPosts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_isPublic", (q) => q.eq("isPublic", true))
      .order("desc")
      .take(50);
  },
});
```

### Optional auth — works for both visitors and signed-in users

```ts
export const listPosts = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const posts = await ctx.db.query("posts").order("desc").take(50);

    if (identity) {
      // Personalize for signed-in users
      return posts.map((p) => ({
        ...p,
        isOwner: p.tokenIdentifier === identity.tokenIdentifier,
      }));
    }
    return posts.map((p) => ({ ...p, isOwner: false }));
  },
});
```

## Mutations

```ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("posts", {
      tokenIdentifier: identity.tokenIdentifier,
      title: args.title,
      content: args.content,
      isPublic: false,
      createdAt: Date.now(),
    });
  },
});
```

### Ownership check before update/delete

```ts
export const deletePost = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const post = await ctx.db.get(args.id);
    if (!post || post.tokenIdentifier !== identity.tokenIdentifier) {
      throw new Error("Not found or unauthorized");
    }

    await ctx.db.delete(args.id);
  },
});
```

## Frontend Usage

### Queries (real-time, auto-updating)

```tsx
"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function PostsList() {
  const posts = useQuery(api.posts.listPublicPosts);

  if (posts === undefined) return <div>Loading...</div>;
  if (posts.length === 0) return <div>No posts yet.</div>;

  return posts.map((post) => <div key={post._id}>{post.title}</div>);
}
```

### Mutations

```tsx
"use client";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function CreatePostButton() {
  const createPost = useMutation(api.posts.createPost);

  const handleClick = async () => {
    await createPost({ title: "Hello", content: "World" });
  };

  return <button onClick={handleClick}>Create Post</button>;
}
```

## Key Things to Remember

- **`identity.tokenIdentifier`** is Convex's stable auth identity key — prefer it for ownership and auth-linked lookups.
- **Auth is opt-in per function.** If you don't call `ctx.auth.getUserIdentity()`, the function is public.
- **Always verify ownership** before update/delete mutations — check that the document's owner field matches `identity.tokenIdentifier`.
- **`useQuery` returns `undefined` while loading**, not `null`. Handle the loading state.
- **Convex queries are real-time** — they automatically re-run when underlying data changes. No need to refetch manually.
- **Indexes matter for performance.** Prefer `withIndex` over JavaScript-side `.filter()` for fields you filter or sort by frequently.

## Dev Commands

```bash
# Run Next.js + Convex together
npm run dev:all

# Run Convex separately
npm run convex:dev
```
