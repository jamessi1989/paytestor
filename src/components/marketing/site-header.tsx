import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center bg-primary-500 font-display text-sm font-bold text-white">
            C
          </span>
          <span className="font-display text-lg font-bold text-neutral-900">
            Crewqa
          </span>
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
