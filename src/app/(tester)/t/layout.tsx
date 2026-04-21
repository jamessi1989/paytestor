import Link from "next/link";
import { LogoMark } from "@/components/marketing/logo";

export default function TesterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
          <Link
            href="/t"
            className="inline-flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-focus"
            aria-label="Crewqa home"
          >
            <LogoMark variant="light" className="h-7 w-7" />
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
