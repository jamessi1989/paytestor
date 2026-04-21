import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { Logo } from "@/components/marketing/logo";

export default async function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Proxy already enforces authentication for /app. Session read here is just
  // to surface the user's email in the chrome.
  const session = await auth();
  const userEmail = session?.user?.email ?? "";

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="container-page flex h-14 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/app"
              className="focus:outline-none focus:ring-4 focus:ring-focus"
              aria-label="Crewqa dashboard"
            >
              <Logo variant="light" />
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
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span>{userEmail}</span>
            <form action={signOutAction}>
              <button
                type="submit"
                className="text-neutral-500 hover:text-primary-500"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
