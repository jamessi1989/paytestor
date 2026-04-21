import Link from "next/link";
import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="focus:outline-none focus:ring-4 focus:ring-focus"
          aria-label="Crewqa home"
        >
          <Logo variant="light" />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-700 md:flex">
          <Link href="/how-it-works" className="hover:text-primary-500">
            How it works
          </Link>
          <Link href="/pricing" className="hover:text-primary-500">
            Pricing
          </Link>
          <Link href="/for-testers" className="hover:text-primary-500">
            For testers
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-neutral-700 hover:text-primary-500 md:inline"
          >
            Sign in
          </Link>
          <Link href="/signup" className="btn-primary text-sm">
            Start a campaign
          </Link>
        </div>
      </div>
    </header>
  );
}
