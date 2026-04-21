"use client";

import { useActionState } from "react";
import { createCampaignAndCheckout } from "@/server/actions/campaigns";

const REGIONS = [
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "Australia",
  "Global",
];

const LANGUAGES = ["English", "Spanish", "German", "French", "Portuguese"];

export function NewCampaignForm() {
  const [state, formAction, pending] = useActionState(
    createCampaignAndCheckout,
    null as { ok: false; error: string } | null
  );

  return (
    <form action={formAction} className="space-y-5">
      <Field
        label="App name"
        name="appName"
        required
        placeholder="Turbo Sudoku"
      />
      <Field
        label="Package name"
        name="appPackage"
        required
        placeholder="com.yourcompany.turbosudoku"
        helpText="The applicationId in your build.gradle."
      />
      <Field
        label="Play Store URL (optional)"
        name="playStoreUrl"
        type="url"
        placeholder="https://play.google.com/store/apps/details?id=..."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Select label="Target region" name="targetRegion" options={REGIONS} />
        <Select label="Target language" name="targetLanguage" options={LANGUAGES} />
      </div>

      {state && !state.ok ? (
        <p className="border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          {state.error}
        </p>
      ) : null}

      <div className="pt-2">
        <button type="submit" className="btn-primary" disabled={pending}>
          {pending ? "Creating…" : "Continue to payment"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
  placeholder,
  helpText,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  helpText?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700">
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 block w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-focus"
      />
      {helpText ? (
        <p className="mt-1 text-xs text-neutral-500">{helpText}</p>
      ) : null}
    </div>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <select
        name={name}
        required
        className="mt-1 block w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-focus"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
