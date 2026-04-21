import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-primary-700 text-primary-200">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center bg-accent-400 font-display text-sm font-bold text-white">
                C
              </span>
              <span className="font-display text-lg font-bold text-white">
                Crewqa
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Rigorous closed-testing for indie Android developers.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Product
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/how-it-works" className="hover:text-white">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/for-testers" className="hover:text-white">
                  For testers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/legal/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="mailto:hello@crewqa.com" className="hover:text-white">
                  hello@crewqa.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-primary-600 pt-6 text-xs">
          © {new Date().getFullYear()} Crewqa. Not affiliated with Google or
          Google Play.
        </div>
      </div>
    </footer>
  );
}
