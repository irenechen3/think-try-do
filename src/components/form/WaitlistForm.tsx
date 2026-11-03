"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  CHILD_AGE_OPTIONS,
  DAY_IDS,
  DURATION_IDS,
  INTEREST_IDS,
  LANGUAGE_IDS,
  LOCATION_IDS,
  MAX_CHILDREN,
  type InterestId,
} from "@/content/site";
import { fmt } from "@/content/i18n";
import { useI18n } from "@/lib/i18n";
import { getAttribution, track } from "@/lib/analytics";
import { PREFILL_EVENT, type PrefillDetail } from "@/lib/prefill";
import { EMPTY_INPUT, STEP_FIELDS, validateAll, validateFields, type FieldErrors, type WaitlistInput } from "@/lib/waitlist";
import { CrossIcon, PlusIcon } from "@/components/ui/Doodles";
import { Chip, ChoiceGroup, FieldError, TextField } from "./Fields";
import { SuccessCard } from "./SuccessCard";

type Status = "idle" | "submitting" | "success" | "error";

const toggleIn = <T,>(list: T[], item: T, on: boolean): T[] =>
  on ? (list.includes(item) ? list : [...list, item]) : list.filter((x) => x !== item);

export function WaitlistForm() {
  const { t, locale } = useI18n();
  const f = t.form;
  const [data, setData] = useState<WaitlistInput>(EMPTY_INPUT);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { ui_language: locale });
  };

  const update = <K extends keyof WaitlistInput>(key: K, value: WaitlistInput[K]) => {
    markStarted();
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  // Adventure cards elsewhere on the page can pre-tick interests.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { interest, selected } = (e as CustomEvent<PrefillDetail>).detail;
      setData((d) => ({ ...d, interests: toggleIn<InterestId>(d.interests, interest, selected) }));
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  // Move focus to the step heading after changing steps (not on first render).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepHeadingRef.current?.focus({ preventScroll: true });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const focusFirstError = (errs: FieldErrors) => {
    const first = Object.keys(errs)[0];
    if (!first) return;
    // Wait for React to render the step / error state before focusing.
    setTimeout(() => {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"] input, [data-field="${first}"] select, [data-field="${first}"] textarea`);
      el?.focus();
    }, 0);
  };

  const goNext = () => {
    const errs = validateFields(STEP_FIELDS[step], data);
    if (Object.keys(errs).length) {
      setErrors(errs);
      focusFirstError(errs);
      track("form_validation_error", { step: step + 1, fields: Object.keys(errs).join(",") });
      return;
    }
    track("form_step_complete", { step: step + 1 });
    setStep((s) => s + 1);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < STEP_FIELDS.length - 1) return goNext();

    const errs = validateAll(data);
    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstStep = STEP_FIELDS.findIndex((fields) => fields.some((fl) => errs[fl]));
      if (firstStep !== step) setStep(firstStep);
      focusFirstError(errs);
      track("form_validation_error", { step: firstStep + 1, fields: Object.keys(errs).join(",") });
      return;
    }

    setStatus("submitting");
    setServerError(null);
    const payload: WaitlistInput = { ...data, uiLocale: locale, attribution: getAttribution() };

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string; fields?: FieldErrors };
        if (body.error === "validation" && body.fields) {
          setErrors(body.fields);
          focusFirstError(body.fields);
        }
        setStatus("error");
        setServerError(f.errors.generic);
        track("form_submit_error", { reason: body.error ?? String(res.status) });
        return;
      }

      const ages = data.childAges.filter((a): a is number => a !== null);
      // Aggregated, non-personal answers only — these are the demand signals.
      track("form_complete", {
        child_count: ages.length,
        child_ages: ages.sort((a, b) => a - b).join(","),
        youngest_age: Math.min(...ages),
        interests: data.interests.join(","),
        preferred_workshop: data.interests[0],
        duration: data.duration,
        preferred_days: data.days.join(","),
        language: data.language,
        location: data.location,
        has_whatsapp: !!data.whatsapp.trim(),
        ui_language: locale,
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setServerError(f.errors.network);
      track("form_submit_error", { reason: "network" });
    }
  };

  if (status === "success") return <SuccessCard />;

  const err = (key: keyof FieldErrors) => (errors[key] ? f.errors[errors[key]!] : undefined);
  const total = STEP_FIELDS.length;
  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onFocus={markStarted}
      noValidate
      aria-labelledby="form-title"
      className="scroll-mt-24 rounded-[var(--radius-card)] border-[3px] border-ink bg-paper p-5 text-ink shadow-[8px_8px_0_0_var(--color-ink)] sm:p-8"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 id="form-title" className="font-display text-xl font-extrabold sm:text-2xl">
          {f.title}
        </h3>
        <p className="shrink-0 text-sm font-semibold text-ink-mute" aria-live="polite">
          {fmt(f.stepLabel, { current: step + 1, total })}
        </p>
      </div>

      {/* Progress */}
      <ol className="mt-4 grid grid-cols-3 gap-2" aria-hidden>
        {f.steps.map((label, i) => (
          <li key={label}>
            <div className={`h-2 rounded-full transition-colors ${i <= step ? "bg-ember" : "bg-ink/10"}`} />
            <p className={`mt-1.5 text-xs font-bold tracking-wide uppercase ${i === step ? "text-ink" : "text-ink-mute"}`}>{label}</p>
          </li>
        ))}
      </ol>

      <h4 ref={stepHeadingRef} tabIndex={-1} className="sr-only">
        {fmt(f.stepLabel, { current: step + 1, total })}: {f.steps[step]}
      </h4>

      <div className="mt-7 space-y-8">
        {step === 0 ? (
          <>
            <fieldset data-field="childAges" aria-describedby={`children-hint${errors.childAges ? " childAges-error" : ""}`}>
              <legend className="font-display text-lg font-extrabold">{f.childrenLegend}</legend>
              <p id="children-hint" className="mt-0.5 text-sm text-ink-mute">
                {f.childrenHint}
              </p>
              <div className="mt-3 space-y-4">
                {data.childAges.map((age, idx) => (
                  <div key={idx} className="rounded-2xl bg-sand/70 p-3.5 sm:p-4">
                    <div className="mb-2.5 flex items-center justify-between">
                      <p id={`child-${idx}-label`} className="font-display font-bold">
                        {fmt(f.childLabel, { n: idx + 1 })}
                      </p>
                      {data.childAges.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => update("childAges", data.childAges.filter((_, i) => i !== idx))}
                          className="inline-flex min-h-10 items-center gap-1 rounded-full px-3 text-sm font-semibold text-ink-mute hover:bg-ink/5 hover:text-ink"
                          aria-label={fmt(f.removeChild, { n: idx + 1 })}
                        >
                          <CrossIcon className="h-4 w-4" />
                        </button>
                      ) : null}
                    </div>
                    <div role="radiogroup" aria-labelledby={`child-${idx}-label`} className="flex flex-wrap gap-1.5">
                      {CHILD_AGE_OPTIONS.map((opt) => (
                        <Chip
                          key={opt}
                          compact
                          type="radio"
                          name={`child-age-${idx}`}
                          value={String(opt)}
                          label={opt === 3 ? f.ageUnder4 : opt === 13 ? f.age13plus : String(opt)}
                          checked={age === opt}
                          invalid={!!errors.childAges}
                          onChange={() => update("childAges", data.childAges.map((a, i) => (i === idx ? opt : a)))}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {data.childAges.length < MAX_CHILDREN ? (
                <button
                  type="button"
                  onClick={() => update("childAges", [...data.childAges, null])}
                  className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-dashed border-ink/40 px-4 font-semibold transition hover:border-ink"
                >
                  <PlusIcon className="h-5 w-5" />
                  {f.addChild}
                </button>
              ) : null}
              <FieldError id="childAges-error" message={err("childAges")} />
            </fieldset>

            <div data-field="location">
              <label htmlFor="location" className="font-display text-lg font-extrabold">
                {f.locationLabel}
              </label>
              <select
                id="location"
                name="location"
                value={data.location}
                onChange={(e) => update("location", e.target.value as WaitlistInput["location"])}
                aria-invalid={!!errors.location || undefined}
                aria-describedby={errors.location ? "location-error" : undefined}
                className={`mt-2 block h-14 w-full appearance-none rounded-2xl border-2 bg-paper bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%231c1b18%22 stroke-width=%222.5%22 stroke-linecap=%22round%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:22px] bg-[right_1rem_center] bg-no-repeat px-4 pr-12 text-[1.05rem] focus:border-ink focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ember ${
                  errors.location ? "border-ember" : "border-ink/25 hover:border-ink/60"
                }`}
              >
                <option value="" disabled>
                  {f.locationPlaceholder}
                </option>
                {LOCATION_IDS.map((id) => (
                  <option key={id} value={id}>
                    {f.options.locations[id]}
                  </option>
                ))}
              </select>
              <FieldError id="location-error" message={err("location")} />
            </div>

            {data.location === "other" ? (
              <TextField
                id="locationOther"
                label={f.locationOtherLabel}
                value={data.locationOther}
                onChange={(v) => update("locationOther", v)}
                error={err("locationOther")}
                autoComplete="address-level2"
                maxLength={80}
              />
            ) : null}
          </>
        ) : null}

        {step === 1 ? (
          <>
            <ChoiceGroup name="interests" legend={f.interestsLegend} hint={f.interestsHint} error={err("interests")}>
              {INTEREST_IDS.map((id) => (
                <Chip
                  key={id}
                  type="checkbox"
                  name="interests"
                  value={id}
                  label={f.options.interests[id]}
                  checked={data.interests.includes(id)}
                  invalid={!!errors.interests}
                  onChange={(on) => update("interests", toggleIn(data.interests, id, on))}
                />
              ))}
            </ChoiceGroup>
            {data.interests.includes("other") ? (
              <TextField
                id="interestOther"
                label={f.interestOtherLabel}
                value={data.interestOther}
                onChange={(v) => update("interestOther", v)}
                optionalLabel={f.optional}
                maxLength={200}
              />
            ) : null}

            <ChoiceGroup name="duration" legend={f.durationLegend} error={err("duration")}>
              {DURATION_IDS.map((id) => (
                <Chip
                  key={id}
                  type="radio"
                  name="duration"
                  value={id}
                  label={f.options.durations[id]}
                  checked={data.duration === id}
                  invalid={!!errors.duration}
                  onChange={() => update("duration", id)}
                />
              ))}
            </ChoiceGroup>

            <ChoiceGroup name="days" legend={f.daysLegend} hint={f.daysHint} error={err("days")}>
              {DAY_IDS.map((id) => (
                <Chip
                  key={id}
                  type="checkbox"
                  name="days"
                  value={id}
                  label={f.options.days[id]}
                  checked={data.days.includes(id)}
                  invalid={!!errors.days}
                  onChange={(on) => update("days", toggleIn(data.days, id, on))}
                />
              ))}
            </ChoiceGroup>

            <ChoiceGroup name="language" legend={f.languageLegend} error={err("language")}>
              {LANGUAGE_IDS.map((id) => (
                <Chip
                  key={id}
                  type="radio"
                  name="language"
                  value={id}
                  label={f.options.languages[id]}
                  checked={data.language === id}
                  invalid={!!errors.language}
                  onChange={() => update("language", id)}
                />
              ))}
            </ChoiceGroup>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <TextField
              id="firstName"
              label={f.nameLabel}
              value={data.firstName}
              onChange={(v) => update("firstName", v)}
              error={err("firstName")}
              autoComplete="given-name"
              maxLength={60}
            />
            <TextField
              id="email"
              type="email"
              inputMode="email"
              label={f.emailLabel}
              value={data.email}
              onChange={(v) => update("email", v)}
              error={err("email")}
              autoComplete="email"
              maxLength={200}
            />
            <TextField
              id="whatsapp"
              type="tel"
              inputMode="tel"
              label={f.whatsappLabel}
              optionalLabel={f.optional}
              hint={f.whatsappHint}
              placeholder={f.whatsappPlaceholder}
              value={data.whatsapp}
              onChange={(v) => update("whatsapp", v)}
              error={err("whatsapp")}
              autoComplete="tel"
              maxLength={30}
            />
            <TextField
              id="loveToTry"
              multiline
              label={f.loveLabel}
              optionalLabel={f.optional}
              placeholder={f.lovePlaceholder}
              value={data.loveToTry}
              onChange={(v) => update("loveToTry", v)}
              maxLength={1000}
            />

            {/* Honeypot — hidden from people and assistive tech */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => update("website", e.target.value)} />
            </div>

            <div data-field="consent">
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-sand/70 p-4">
                <input
                  type="checkbox"
                  checked={data.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  aria-invalid={!!errors.consent || undefined}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                  className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer accent-ember"
                />
                <span className="text-[0.98rem] leading-snug font-medium">{f.consentLabel}</span>
              </label>
              <FieldError id="consent-error" message={err("consent")} />
              <p className="mt-3 text-sm text-ink-mute">{f.privacyNote}</p>
            </div>
          </>
        ) : null}
      </div>

      {hasErrors || serverError ? (
        <p role="alert" className="mt-6 rounded-2xl bg-ember-soft px-4 py-3 text-sm font-semibold text-ember-deep">
          {serverError ?? f.errors.summary}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex min-h-[52px] items-center justify-center rounded-full px-6 font-display font-bold text-ink-soft transition hover:bg-ink/5 hover:text-ink"
          >
            ← {f.back}
          </button>
        ) : (
          <span className="hidden sm:block" />
        )}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-ember px-8 font-display text-[1.05rem] font-bold text-paper shadow-[0_4px_0_0_var(--color-ember-deep)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-ember-deep)] active:translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
        >
          {step < total - 1 ? `${f.next} →` : status === "submitting" ? f.submitting : f.submit}
        </button>
      </div>
    </form>
  );
}
