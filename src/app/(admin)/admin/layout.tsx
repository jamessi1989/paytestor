import Link from "next/link";
import { redirect } from "next/navigation";
import {
  createSupabaseServerClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login?redirect=/admin");
    // Role enforcement happens in each server action; keep layout thin.
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-900 text-neutral-100">
      <header className="border-b border-neutral-800 bg-primary-700">
        <div className="container-page flex h-14 items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center bg-highlight-400 font-display text-xs font-bold text-primary-900">
              C
            </span>
            <span className="font-display text-sm font-bold text-white">
              Crewqa Admin
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-neutral-200">
            <Link href="/admin/queue" className="hover:text-white">
              QA queue
            </Link>
            <Link href="/admin/campaigns" className="hover:text-white">
              Campaigns
            </Link>
            <Link href="/admin/testers" className="hover:text-white">
              Testers
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
