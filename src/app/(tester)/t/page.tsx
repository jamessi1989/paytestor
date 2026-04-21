export default function TesterInbox() {
  return (
    <div className="py-6">
      <h1 className="font-display text-xl font-bold text-neutral-900">
        Your tasks
      </h1>
      <p className="mt-1 text-sm text-neutral-600">
        Tasks show up here the day they&apos;re due. Submit on time to keep your
        spot and earn credit.
      </p>

      <div className="mt-8 border border-dashed border-neutral-300 bg-white p-8 text-center">
        <h2 className="font-display text-base font-bold text-neutral-900">
          No active tasks
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          When a developer assigns you a campaign, your Day 1 install task will
          appear here.
        </p>
      </div>
    </div>
  );
}
