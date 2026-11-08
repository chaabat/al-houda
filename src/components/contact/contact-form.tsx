"use client";

import { CircleAlert, CircleCheck, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { CONTACT_RECIPIENTS, type ContactRecipient } from "@/config/site";

const RECIPIENTS = Object.keys(CONTACT_RECIPIENTS) as ContactRecipient[];

// Shown in the email subject, in French for the team whatever the visitor's language.
const RECIPIENT_FR: Record<ContactRecipient, string> = {
  contact: "Contact",
  teaching: "Enseignement",
  presidency: "Présidence",
  secretariat: "Secrétariat",
  imam: "Imam",
};

/** Mailbox of a choice (an empty address falls back to the general contact). */
const mailboxOf = (recipient: ContactRecipient) =>
  CONTACT_RECIPIENTS[recipient] || CONTACT_RECIPIENTS.contact;

const inputClass =
  "mt-1.5 w-full rounded-xl border border-brand/15 bg-white px-4 py-3 text-ink shadow-sm outline-none transition placeholder:text-ink/40 focus:border-brand-light focus:ring-2 focus:ring-brand-light/20";

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </label>
      {children}
    </div>
  );
}

const EMPTY = { recipient: "", first_name: "", last_name: "", email: "", subject: "", message: "" };
type Status = "idle" | "sending" | "sent" | "error";

/**
 * Contact form of a static site: the message is sent by FormSubmit (free, no account)
 * straight to the mailbox of the chosen contact, like the form of alhouda.org.
 */
export function ContactForm() {
  const t = useTranslations("contact.form");
  const uid = useId();
  const topRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "sent" || status === "error")
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [status]);

  const id = (name: string) => `${uid}-${name}`;
  const bind = (name: keyof typeof EMPTY) => ({
    id: id(name),
    name,
    value: values[name],
    onChange: (event: { target: { value: string } }) =>
      setValues((current) => ({ ...current, [name]: event.target.value })),
    className: inputClass,
  });

  const recipient = (values.recipient || "contact") as ContactRecipient;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const honeypot = (event.currentTarget.elements.namedItem("_honey") as HTMLInputElement | null)
      ?.value;
    const name = `${values.first_name.trim()} ${values.last_name.trim()}`.trim();
    const subject = values.subject.trim();

    setStatus("sending");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${mailboxOf(recipient)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Site Al-Houda — ${RECIPIENT_FR[recipient]}${subject ? ` : ${subject}` : ""}`,
          _template: "table",
          _captcha: "false",
          _honey: honeypot ?? "",
          Nom: name,
          Email: values.email.trim(),
          Destinataire: RECIPIENT_FR[recipient],
          Sujet: subject || "—",
          Message: values.message.trim(),
          _replyto: values.email.trim(),
        }),
      });
      const result = (await response.json()) as { success?: string | boolean };
      setStatus(response.ok && String(result.success) === "true" ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div ref={topRef} className="scroll-mt-32 py-10 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-white">
          <CircleCheck className="h-8 w-8" aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-serif text-3xl font-semibold text-brand">{t("successTitle")}</h2>
        <p className="mx-auto mt-3 max-w-md text-ink/80">{t("successText")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div ref={topRef} className="scroll-mt-32" />
      {/* Honeypot: invisible to people, filled by bots, then rejected by FormSubmit. */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {status === "error" ? (
        <p
          role="alert"
          className="flex items-start gap-3 rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-800 ring-1 ring-red-200"
        >
          <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>{t("errors.unavailable", { email: mailboxOf(recipient) })}</span>
        </p>
      ) : null}

      <Field id={id("recipient")} label={t("recipient")} required>
        <select {...bind("recipient")} required>
          <option value="">{t("recipientNone")}</option>
          {RECIPIENTS.map((key) => (
            <option key={key} value={key}>
              {t(`recipients.${key}`)}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("last_name")} label={t("lastName")} required>
          <input {...bind("last_name")} required maxLength={60} autoComplete="family-name" />
        </Field>
        <Field id={id("first_name")} label={t("firstName")} required>
          <input {...bind("first_name")} required maxLength={60} autoComplete="given-name" />
        </Field>
      </div>

      <Field id={id("email")} label={t("email")} required>
        <input
          {...bind("email")}
          type="email"
          required
          maxLength={190}
          autoComplete="email"
          dir="ltr"
        />
      </Field>

      <Field id={id("subject")} label={t("subject")}>
        <input {...bind("subject")} maxLength={150} />
      </Field>

      <Field id={id("message")} label={t("message")} required>
        <textarea {...bind("message")} required rows={6} maxLength={3000} />
      </Field>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <p className="max-w-sm text-xs text-ink/60">{t("privacyNote")}</p>
        <Button type="submit" size="lg" disabled={status === "sending"}>
          <Send className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
          {status === "sending" ? t("sending") : t("send")}
        </Button>
      </div>
    </form>
  );
}
