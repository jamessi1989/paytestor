import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Role } from "@prisma/client";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: Role }).role ?? "DEV";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
});

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

// Resolves the current session to a Developer row, upserting on first sight.
// Throws AuthError if not signed in.
export async function requireDeveloper() {
  const session = await auth();
  if (!session?.user?.id) throw new AuthError("Not signed in");

  const developer = await db.developer.upsert({
    where: { userId: session.user.id },
    update: {},
    create: { userId: session.user.id },
  });
  const user = await db.user.findUniqueOrThrow({
    where: { id: session.user.id },
  });
  return { user, developer };
}
