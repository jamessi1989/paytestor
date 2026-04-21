import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

// Edge-safe portion of the Auth.js config. Imported by proxy.ts (edge) and
// by lib/auth.ts (node, where the Prisma adapter is attached).
export default {
  providers: [Google, GitHub],
  pages: { signIn: "/login" },
  trustHost: true,
} satisfies NextAuthConfig;
