import Link from "next/link";
import { LogoMark } from "@/components/marketing/logo";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Proxy enforces authentication. Role enforcement happens in each admin
  // server action, not the layout.
  return (
    <div className="flex min-h-screen flex-col bg-neutral-900 text-neutral-100">
      <header className="border-b border-neutral-800 bg-primary-700">
        <div className="container-page flex h-14 items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-focus"
            aria-label="Crewqa admin"
          >
            <LogoMark variant="dark" className="h-7 w-7" />
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
