import Link from "next/link";
import { redirect } from "next/navigation";
import {
  createSupabaseServerClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

export default async function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userEmail = "dev mode — supabase not configured";
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login?redirect=/app");
    userEmail = user.email ?? "";
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="container-page flex h-14 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/app" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center bg-primary-500 font-display text-xs font-bold text-white">
                C
              </span>
              <span className="font-display text-sm font-bold text-neutral-900">
                Crewqa
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-neutral-700">
              <Link href="/app" className="hover:text-primary-500">
                Campaigns
              </Link>
              <Link href="/app/billing" className="hover:text-primary-500">
                Billing
              </Link>
            </nav>
          </div>
          <span className="text-xs text-neutral-500">{userEmail}</span>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
