import Link from "next/link";
import { redirect } from "next/navigation";
import {
  createSupabaseServerClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

export default async function TesterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login?redirect=/t");
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
          <Link href="/t" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center bg-accent-400 font-display text-xs font-bold text-white">
              C
            </span>
            <span className="font-display text-sm font-bold text-neutral-900">
              Crewqa
            </span>
          </Link>
          <Link
            href="/t/wallet"
            className="text-xs font-medium text-neutral-600 hover:text-primary-500"
          >
            Wallet
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-16">
        {children}
      </main>
      <nav className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-lg items-center justify-around py-3 text-xs">
          <Link href="/t" className="text-neutral-700">
            Tasks
          </Link>
          <Link href="/t/wallet" className="text-neutral-700">
            Wallet
          </Link>
          <Link href="/t/account" className="text-neutral-700">
            Account
          </Link>
        </div>
      </nav>
    </div>
  );
}
