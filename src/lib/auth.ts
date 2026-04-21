import { db } from "@/lib/db";
import {
  createSupabaseServerClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

/**
 * Resolves the current Supabase session to a Developer row, upserting the
 * User + Developer records on first sight.
 * Throws AuthError if no session or Supabase is unconfigured.
 */
export async function requireDeveloper() {
  if (!isSupabaseConfigured()) {
    throw new AuthError(
      "Supabase is not configured. Fill NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  const supabase = await createSupabaseServerClient();
  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser();
  if (!supabaseUser) throw new AuthError("Not signed in");

  const user = await db.user.upsert({
    where: { supabaseId: supabaseUser.id },
    update: { email: supabaseUser.email ?? "" },
    create: {
      supabaseId: supabaseUser.id,
      email: supabaseUser.email ?? "",
      role: "DEV",
    },
  });

  const developer = await db.developer.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id },
  });

  return { user, developer };
}
