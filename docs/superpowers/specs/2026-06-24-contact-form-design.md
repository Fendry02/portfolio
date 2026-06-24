# Contact form (home page) — Design

**Date:** 2026-06-24
**Status:** Approved

## Goal

Replace the home page `mailto:` primary CTA with a direct contact form that reduces
friction and qualifies leads, while keeping the email + LinkedIn links as a fallback.
Emails are sent through Resend (already in the owner's toolkit).

## Scope

- Home page (`app/page.tsx`) contact section only. The Parcours/`jobs` page keeps its
  direct links (it is a résumé page, not a conversion surface).
- French copy (home page audience is French freelance clients).

Out of scope (YAGNI): multi-step wizard, file upload, CRM integration, autoreply email,
budget field, contact form on the jobs page.

## Fields

| Field          | Type     | Required | Notes                                                                              |
| -------------- | -------- | -------- | ---------------------------------------------------------------------------------- |
| Nom            | text     | yes      | 2–80 chars                                                                         |
| Email          | email    | yes      | valid email                                                                        |
| Type de projet | select   | yes      | Site vitrine / App web & mobile / Audit & automatisation IA / Formation IA / Autre |
| Message        | textarea | yes      | 10–2000 chars                                                                      |
| `website`      | hidden   | —        | honeypot, must stay empty                                                          |
| `_ts`          | hidden   | —        | render timestamp, time-trap                                                        |

## Architecture

- **`app/actions/contact.ts`** — Server Action (`'use server'`):
  parse `FormData` → Zod validation → anti-spam checks → send via Resend →
  return typed result `{ ok: boolean; errors?: Record<string,string>; message?: string }`.
- **`app/components/contact-form.tsx`** — Client Component (`'use client'`):
  uses `useActionState`, renders fields, per-field inline errors, and idle/submitting/
  success/error states. Styled with existing tokens (borders `base-300`, `rounded-lg`,
  blue focus ring, `btnBlue` submit button).
- **Integration** — rendered inside the existing contact section of `app/page.tsx`;
  the `mailto:` and LinkedIn links remain below as a fallback.
- **Dependencies** — add `resend` and `zod`.

## Email sending (Resend, no verified domain)

The owner cannot verify a domain. We use Resend's default shared sender.

- `from`: `onboarding@resend.dev`
- `to`: `bruy.benoit@gmail.com` (must equal the Resend account email — required by the
  shared-sender restriction; confirmed by owner)
- `replyTo`: the visitor's email (owner replies directly from their inbox)
- `subject`: `Nouveau contact — <type de projet> — <nom>`
- `html`: name, email, project type, message (escaped)

No autoreply to the prospect (shared sender cannot email arbitrary recipients). The
prospect sees an on-screen confirmation only.

Constraints: shared sender is limited to ~100 emails/day and only to the account email.
Acceptable for a personal contact form. Upgrading later to a verified domain is a
one-line change to `from` (and unlocks autoreply).

## Data flow

1. Visitor submits the form.
2. Server Action validates with Zod (server-side, never trusts client).
3. Anti-spam: if honeypot `website` is non-empty → return fake success, do not send.
   If `now - _ts < 2000ms` → reject as bot.
4. `resend.emails.send({ from, to, replyTo, subject, html })`.
5. On success → `{ ok: true }`; UI switches to success state.
6. On Resend failure → `{ ok: false, message }`; UI shows generic error + visible
   `mailto:` fallback. Detailed error logged server-side, never exposed.

## Anti-spam (no CAPTCHA)

- Honeypot hidden field `website`.
- Time-trap hidden timestamp `_ts` (reject submissions faster than 2s).

## Security

- `RESEND_API_KEY` from environment (`.env.local` locally, Vercel env in all
  environments). Never committed. Action fails fast with a clear server log if missing.
- All validation server-side.
- Error messages to the UI are generic; no API/internal details leaked.
- `.env.example` documents the required variable.

## Accessibility

- `<label>` per field, `aria-invalid` + `aria-describedby` for errors, submit status in
  an `aria-live` region, focus moved to the status/first error after submit.

## Testing

The repo has no test harness yet. Proposed minimal coverage:

- Unit test the Zod schema + action logic with Resend mocked (valid input, missing
  fields, honeypot filled, time-trap).
- Visual verification (desktop + mobile) of the form, success, and error states via
  headless browser.

End-to-end real email send can only be verified once `RESEND_API_KEY` is set.
