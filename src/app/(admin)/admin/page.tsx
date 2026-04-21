export default function AdminHome() {
  return (
    <div className="container-page py-10">
      <h1 className="font-display text-2xl font-bold text-white">Queue</h1>
      <p className="mt-1 text-sm text-neutral-400">
        Submissions flagged by the LLM triage pass.
      </p>

      <div className="mt-8 border border-neutral-800 bg-neutral-800 p-8 text-center">
        <h2 className="font-display text-base font-bold text-white">
          Queue is empty
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Nothing to review. Go find a better problem to work on.
        </p>
      </div>
    </div>
  );
}
