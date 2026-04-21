import { signIn } from "@/lib/auth";

type Props = { searchParams: Promise<{ redirect?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { redirect } = await searchParams;
  const redirectTo = redirect && redirect.startsWith("/") ? redirect : "/app";

  async function signInWithGoogle() {
    "use server";
    await signIn("google", { redirectTo });
  }
  async function signInWithGitHub() {
    "use server";
    await signIn("github", { redirectTo });
  }

  return (
    <div className="bg-white p-8 shadow-sm ring-1 ring-neutral-200">
      <h1 className="font-display text-2xl font-bold text-neutral-900">
        Sign in
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        Use your Google or GitHub account to continue. No passwords, no inboxes
        full of reset links.
      </p>

      <div className="mt-6 space-y-3">
        <form action={signInWithGoogle}>
          <button type="submit" className="btn-primary w-full">
            Continue with Google
          </button>
        </form>
        <form action={signInWithGitHub}>
          <button type="submit" className="btn-secondary w-full">
            Continue with GitHub
          </button>
        </form>
      </div>

      <p className="mt-6 text-xs text-neutral-500">
        First time? We&apos;ll spin up your Crewqa account on sign-in.
      </p>
    </div>
  );
}
