"use client";

import type { ReactNode } from "react";
import { CheckIcon } from "@/components/ui/Doodles";

/* Shared pieces for the waitlist form. Inputs are real native controls
   (visually restyled) so keyboard, screen-reader and autofill all just work. */

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-ember-deep" role="alert">
      <span aria-hidden>⚠</span>
      {message}
    </p>
  );
}

type GroupProps = {
  name: string;
  legend: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  optionalLabel?: string;
};

export function ChoiceGroup({ name, legend, hint, error, children, optionalLabel }: GroupProps) {
  const hintId = `${name}-hint`;
  const errId = `${name}-error`;
  return (
    <fieldset data-field={name} aria-describedby={[hint ? hintId : "", error ? errId : ""].join(" ").trim() || undefined}>
      <legend className="font-display text-lg font-extrabold">
        {legend}
        {optionalLabel ? <span className="ml-2 text-sm font-semibold text-ink-mute">({optionalLabel})</span> : null}
      </legend>
      {hint ? (
        <p id={hintId} className="mt-0.5 text-sm text-ink-mute">
          {hint}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
      <FieldError id={errId} message={error} />
    </fieldset>
  );
}

type ChipProps = {
  type: "checkbox" | "radio";
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  invalid?: boolean;
  compact?: boolean;
};

export function Chip({ type, name, value, label, checked, onChange, invalid, compact }: ChipProps) {
  return (
    <label className="relative cursor-pointer">
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-invalid={invalid || undefined}
        className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
      <span
        className={`flex min-h-12 items-center gap-2 rounded-[1.5rem] border-2 py-1.5 leading-tight font-semibold transition select-none peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ember ${
          compact ? "min-w-12 justify-center px-3" : "px-4"
        } ${
          checked
            ? "border-ink bg-ink text-paper"
            : invalid
              ? "border-ember bg-paper text-ink hover:border-ink"
              : "border-ink/25 bg-paper text-ink hover:border-ink"
        }`}
      >
        {type === "checkbox" && !compact ? (
          <span
            aria-hidden
            className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 ${checked ? "border-sun bg-sun text-ink" : "border-ink/30"}`}
          >
            {checked ? <CheckIcon className="h-3.5 w-3.5" /> : null}
          </span>
        ) : null}
        {label}
      </span>
    </label>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  optionalLabel?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number;
};

export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  optionalLabel,
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
  multiline,
  maxLength,
}: TextFieldProps) {
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].join(" ").trim() || undefined;
  const cls = `mt-2 block w-full rounded-2xl border-2 bg-paper px-4 text-[1.05rem] text-ink placeholder:text-ink-mute/70 transition focus:border-ink focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ember ${
    error ? "border-ember" : "border-ink/25 hover:border-ink/60"
  }`;
  return (
    <div data-field={id}>
      <label htmlFor={id} className="font-display text-lg font-extrabold">
        {label}
        {optionalLabel ? <span className="ml-2 text-sm font-semibold text-ink-mute">({optionalLabel})</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-0.5 text-sm text-ink-mute">
          {hint}
        </p>
      ) : null}
      {multiline ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          maxLength={maxLength}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          className={`${cls} min-h-28 py-3`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          className={`${cls} h-14`}
        />
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
