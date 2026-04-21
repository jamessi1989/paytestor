export default function SignupPage() {
  return (
    <div className="bg-white p-8 shadow-sm ring-1 ring-neutral-200">
      <h1 className="font-display text-2xl font-bold text-neutral-900">
        Start a campaign
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        Create your developer account. You&apos;ll fund your first campaign on the
        next step.
      </p>
      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Email
          </label>
          <input
            type="email"
            className="mt-1 block w-full rounded border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-focus"
            placeholder="you@example.com"
          />
        </div>
        <button type="submit" className="btn-primary w-full" disabled>
          Create account
        </button>
      </form>
    </div>
  );
}
