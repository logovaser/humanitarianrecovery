"use client";

import { useState, useTransition } from "react";
import { submitEducationRequestAction } from "@/app/education-request/actions";
import { useLanguage } from "@/components/LanguageProvider";

const cooperationTypes = ["cooperation", "assistance", "education"] as const;
type CooperationType = (typeof cooperationTypes)[number];

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-brand";

export function EducationRequestForm() {
  const { t } = useLanguage();
  const f = t.educationRequest;
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await submitEducationRequestAction(formData);
        setDone(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : f.errorMessage);
      }
    });
  }

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-ink-strong sm:text-4xl">{f.title}</h1>
      <p className="mb-10 text-ink/70">{f.subtitle}</p>

      {done ? (
        <div className="rounded-2xl bg-brand/8 px-8 py-10 text-center">
          <p className="text-xl font-bold text-brand">{f.successTitle}</p>
          <p className="mt-2 text-ink/70">{f.successMessage}</p>
        </div>
      ) : (
        <form action={handleSubmit} className="space-y-6">
          <label className="block space-y-1.5">
            <span className="text-sm font-semibold text-ink-strong">{f.organization}</span>
            <input
              name="organization"
              required
              placeholder={f.organizationPlaceholder}
              className={inputCls}
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-sm font-semibold text-ink-strong">{f.purpose}</span>
            <textarea
              name="purpose"
              required
              rows={4}
              placeholder={f.purposePlaceholder}
              className={`${inputCls} resize-none`}
            />
          </label>

          <fieldset className="space-y-1.5">
            <legend className="text-sm font-semibold text-ink-strong">{f.cooperationType}</legend>
            <div className="mt-2 flex flex-wrap gap-3">
              {cooperationTypes.map((type) => (
                <label
                  key={type}
                  className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium has-[:checked]:border-brand has-[:checked]:bg-brand/5 has-[:checked]:text-brand"
                >
                  <input
                    type="radio"
                    name="cooperationType"
                    value={type}
                    required
                    className="accent-brand"
                  />
                  {f[type as CooperationType]}
                </label>
              ))}
            </div>
          </fieldset>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-brand px-8 py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60"
          >
            {isPending ? f.submitting : f.submit}
          </button>
        </form>
      )}
    </div>
  );
}
