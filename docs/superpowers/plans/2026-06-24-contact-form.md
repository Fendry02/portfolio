# Contact Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a direct contact form to the home page that sends an email via Resend and keeps the `mailto:`/LinkedIn links as a fallback.

**Architecture:** A pure logic module (Zod schema + anti-spam + email builders) is unit-tested in isolation. A thin Server Action wires that logic to the Resend SDK. A client component renders the form with `useActionState` and per-field error states. The home page contact section embeds the component.

**Tech Stack:** Next.js 16 (App Router, React 19 Server Actions), TypeScript, Zod, Resend, Vitest.

## Global Constraints

- Next.js `^16.2.9`, App Router, React 19 `useActionState`.
- Email transport: Resend shared sender. `from: 'onboarding@resend.dev'`, `to: 'bruy.benoit@gmail.com'`, `replyTo: <visitor email>`. No verified domain, no autoreply to prospect.
- `RESEND_API_KEY` read from environment only; never committed; action fails gracefully if missing.
- French copy. Project types (exact): `Site vitrine`, `Application web & mobile`, `Audit & automatisation IA`, `Formation IA`, `Autre`.
- All validation server-side. UI error messages generic, no internal details leaked.
- Anti-spam: honeypot field `website` + time-trap field `_ts` (min 2000ms). No CAPTCHA.
- Styling reuses existing tokens: borders `base-300`, `rounded-lg`, blue `#2563eb`, `btnBlue` button.

---

### Task 1: Dependencies, env example, test runner

**Files:**

- Modify: `package.json` (deps + test script)
- Create: `.env.example`
- Create: `vitest.config.ts`

**Interfaces:**

- Produces: `resend`, `zod` available at runtime; `vitest` + `npm test` for later tasks; `RESEND_API_KEY` documented.

- [ ] **Step 1: Install runtime + dev dependencies**

```bash
npm install resend zod
npm install -D vitest
```

- [ ] **Step 2: Add the test script to package.json**

In `package.json` `"scripts"`, add:

```json
"test": "vitest run"
```

- [ ] **Step 3: Create vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['app/**/*.test.ts'],
  },
})
```

- [ ] **Step 4: Create .env.example**

```bash
# Resend API key — https://resend.com/api-keys
# Sending-access key is enough. Used by the contact form Server Action.
RESEND_API_KEY=
```

- [ ] **Step 5: Verify the test runner starts**

Run: `npm test`
Expected: exits 0 with "No test files found" (no tests yet).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.config.ts .env.example
git commit -m "chore: add resend, zod, vitest and env example for contact form"
```

---

### Task 2: Pure contact logic (schema, anti-spam, email builders)

**Files:**

- Create: `app/lib/contact.ts`
- Test: `app/lib/contact.test.ts`

**Interfaces:**

- Produces:
  - `PROJECT_TYPES: readonly string[]`
  - `contactSchema` (Zod) and `type ContactInput = { name; email; projectType; message }`
  - `isLikelyBot(honeypot: string, elapsedMs: number): boolean`
  - `escapeHtml(value: string): string`
  - `buildSubject(input: ContactInput): string`
  - `buildHtml(input: ContactInput): string`

- [ ] **Step 1: Write the failing test**

`app/lib/contact.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import {
  contactSchema,
  isLikelyBot,
  escapeHtml,
  buildSubject,
  buildHtml,
} from './contact'

const valid = {
  name: 'Marie Dupont',
  email: 'marie@example.com',
  projectType: 'Site vitrine',
  message: 'Bonjour, je voudrais un site pour mon activité.',
}

describe('contactSchema', () => {
  it('accepts valid input', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects a short name', () => {
    const r = contactSchema.safeParse({ ...valid, name: 'M' })
    expect(r.success).toBe(false)
  })

  it('rejects an invalid email', () => {
    const r = contactSchema.safeParse({ ...valid, email: 'nope' })
    expect(r.success).toBe(false)
  })

  it('rejects an unknown project type', () => {
    const r = contactSchema.safeParse({ ...valid, projectType: 'Fusée' })
    expect(r.success).toBe(false)
  })

  it('rejects a too-short message', () => {
    const r = contactSchema.safeParse({ ...valid, message: 'court' })
    expect(r.success).toBe(false)
  })
})

describe('isLikelyBot', () => {
  it('flags a filled honeypot', () => {
    expect(isLikelyBot('http://spam', 5000)).toBe(true)
  })

  it('flags a too-fast submission', () => {
    expect(isLikelyBot('', 800)).toBe(true)
  })

  it('passes a normal submission', () => {
    expect(isLikelyBot('', 5000)).toBe(false)
  })
})

describe('escapeHtml', () => {
  it('escapes angle brackets and quotes', () => {
    expect(escapeHtml('<script>"&\'')).toBe('&lt;script&gt;&quot;&amp;&#39;')
  })
})

describe('buildSubject / buildHtml', () => {
  it('builds a subject with type and name', () => {
    expect(buildSubject(valid)).toBe(
      'Nouveau contact — Site vitrine — Marie Dupont',
    )
  })

  it('escapes user content in the html body', () => {
    const html = buildHtml({ ...valid, message: '<b>hi</b>' })
    expect(html).toContain('&lt;b&gt;hi&lt;/b&gt;')
    expect(html).not.toContain('<b>hi</b>')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./contact`.

- [ ] **Step 3: Write minimal implementation**

`app/lib/contact.ts`:

```ts
import { z } from 'zod'

export const PROJECT_TYPES = [
  'Site vitrine',
  'Application web & mobile',
  'Audit & automatisation IA',
  'Formation IA',
  'Autre',
] as const

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Indiquez votre nom.')
    .max(80, 'Nom trop long.'),
  email: z.string().trim().email('Email invalide.'),
  projectType: z.enum(PROJECT_TYPES, {
    message: 'Choisissez un type de projet.',
  }),
  message: z
    .string()
    .trim()
    .min(10, 'Message trop court (10 caractères minimum).')
    .max(2000, 'Message trop long.'),
})

export type ContactInput = z.infer<typeof contactSchema>

const MIN_FILL_MS = 2000

export function isLikelyBot(honeypot: string, elapsedMs: number): boolean {
  if (honeypot.trim() !== '') return true
  if (elapsedMs < MIN_FILL_MS) return true
  return false
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function buildSubject(input: ContactInput): string {
  return `Nouveau contact — ${input.projectType} — ${input.name}`
}

export function buildHtml(input: ContactInput): string {
  const { name, email, projectType, message } = input
  return [
    '<h2>Nouveau message depuis bbenoit.fr</h2>',
    `<p><strong>Nom :</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email :</strong> ${escapeHtml(email)}</p>`,
    `<p><strong>Type de projet :</strong> ${escapeHtml(projectType)}</p>`,
    '<p><strong>Message :</strong></p>',
    `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
  ].join('\n')
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS (all describe blocks green).

- [ ] **Step 5: Commit**

```bash
git add app/lib/contact.ts app/lib/contact.test.ts
git commit -m "feat: contact form validation, anti-spam and email builders"
```

---

### Task 3: Server Action

**Files:**

- Create: `app/actions/contact.ts`

**Interfaces:**

- Consumes: `contactSchema`, `isLikelyBot`, `buildSubject`, `buildHtml` from `@/app/lib/contact`.
- Produces:
  - `type ContactState = { status: 'idle' | 'success' | 'error'; message?: string; errors?: Partial<Record<'name'|'email'|'projectType'|'message', string>> }`
  - `submitContact(prev: ContactState, formData: FormData): Promise<ContactState>`

- [ ] **Step 1: Create the Server Action**

`app/actions/contact.ts`:

```ts
'use server'

import { Resend } from 'resend'

import {
  contactSchema,
  isLikelyBot,
  buildSubject,
  buildHtml,
} from '@/app/lib/contact'

const FROM = 'onboarding@resend.dev'
const TO = 'bruy.benoit@gmail.com'

type FieldKey = 'name' | 'email' | 'projectType' | 'message'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<FieldKey, string>>
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const honeypot = String(formData.get('website') ?? '')
  const startedAt = Number(formData.get('_ts') ?? 0)

  // Bots: silently report success so they get no useful feedback.
  if (isLikelyBot(honeypot, Date.now() - startedAt)) {
    return { status: 'success' }
  }

  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    projectType: formData.get('projectType'),
    message: formData.get('message'),
  })

  if (!parsed.success) {
    const errors: ContactState['errors'] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as FieldKey
      if (key && !errors[key]) errors[key] = issue.message
    }
    return {
      status: 'error',
      errors,
      message: 'Veuillez corriger les champs indiqués.',
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set')
    return {
      status: 'error',
      message:
        "L'envoi est momentanément indisponible. Écrivez-moi directement par email.",
    }
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: parsed.data.email,
      subject: buildSubject(parsed.data),
      html: buildHtml(parsed.data),
    })

    if (error) {
      console.error('[contact] Resend error', error)
      return {
        status: 'error',
        message: "L'envoi a échoué. Réessayez ou écrivez-moi par email.",
      }
    }

    return { status: 'success' }
  } catch (err) {
    console.error('[contact] unexpected error', err)
    return {
      status: 'error',
      message: "L'envoi a échoué. Réessayez ou écrivez-moi par email.",
    }
  }
}
```

- [ ] **Step 2: Verify it type-checks / builds**

Run: `npx tsc --noEmit --pretty false 2>&1 | grep -v "baseUrl" | grep -i "contact" || echo "no contact type errors"`
Expected: `no contact type errors`. (If the Resend SDK rejects `replyTo`, use `reply_to` instead and re-run.)

- [ ] **Step 3: Commit**

```bash
git add app/actions/contact.ts
git commit -m "feat: contact form Server Action with Resend"
```

---

### Task 4: Client form component

**Files:**

- Create: `app/components/contact-form.tsx`

**Interfaces:**

- Consumes: `submitContact`, `ContactState` from `@/app/actions/contact`; `PROJECT_TYPES` from `@/app/lib/contact`.
- Produces: default export `ContactForm` (no props).

- [ ] **Step 1: Create the component**

`app/components/contact-form.tsx`:

```tsx
'use client'

import { useActionState, useEffect, useState } from 'react'

import { submitContact, type ContactState } from '@/app/actions/contact'
import { PROJECT_TYPES } from '@/app/lib/contact'

const initialState: ContactState = { status: 'idle' }

const fieldBase =
  'w-full rounded-lg border bg-base-100 px-4 py-3 text-sm text-base-content transition focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/25'
const labelBase =
  'mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-base-content/55'

function fieldClass(hasError: boolean): string {
  return `${fieldBase} ${hasError ? 'border-red-400' : 'border-base-300'}`
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  )
  const [startedAt, setStartedAt] = useState(0)

  useEffect(() => {
    setStartedAt(Date.now())
  }, [])

  if (state.status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="qclay-subtle-card rounded-xl border border-base-300 bg-base-100 p-8 text-center"
      >
        <p className="text-lg font-semibold tracking-tight">
          Message envoyé, merci&nbsp;!
        </p>
        <p className="mt-2 text-sm leading-6 text-base-content/65">
          Je reviens vers vous sous 24&nbsp;h ouvrées.
        </p>
      </div>
    )
  }

  const errors = state.errors ?? {}

  return (
    <form action={formAction} className="grid gap-4 text-left" noValidate>
      <input type="hidden" name="_ts" value={startedAt} readOnly />
      {/* Honeypot: visually hidden, off accessibility tree, off tab order */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="website">Ne pas remplir</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className={labelBase}>
          Nom
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={fieldClass(Boolean(errors.name))}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelBase}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={fieldClass(Boolean(errors.email))}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="projectType" className={labelBase}>
          Type de projet
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          defaultValue=""
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={
            errors.projectType ? 'projectType-error' : undefined
          }
          className={fieldClass(Boolean(errors.projectType))}
        >
          <option value="" disabled>
            Choisissez…
          </option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p id="projectType-error" className="mt-1 text-xs text-red-600">
            {errors.projectType}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelBase}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${fieldClass(Boolean(errors.message))} resize-y`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {state.status === 'error' && state.message && (
        <p role="alert" aria-live="assertive" className="text-sm text-red-600">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="interactive qclay-button inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? 'Envoi…' : 'Envoyer le message'}
        {!pending && <span aria-hidden="true">→</span>}
      </button>
    </form>
  )
}
```

- [ ] **Step 2: Verify it builds**

Run: `npx next build 2>&1 | grep -E "✓ Compiled|error|Failed" | head -5`
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Commit**

```bash
git add app/components/contact-form.tsx
git commit -m "feat: contact form client component with useActionState"
```

---

### Task 5: Integrate into the home page contact section

**Files:**

- Modify: `app/page.tsx` (contact section, around the `#contact` block)

**Interfaces:**

- Consumes: default export `ContactForm` from `./components/contact-form`.

- [ ] **Step 1: Import the component**

At the top of `app/page.tsx`, add with the other component imports:

```tsx
import ContactForm from './components/contact-form'
```

- [ ] **Step 2: Render the form inside the contact section**

In the `#contact` section, replace the existing button row (the `<div className="mt-7 flex w-full flex-col gap-2.5 ...">…</div>` containing the `bruy.benoit@gmail.com` and `LinkedIn` links) with the form plus the links kept as a fallback:

```tsx
<div className="mt-8 w-full max-w-xl">
  <ContactForm />

  <p className="mt-6 text-center text-sm text-base-content/55">
    Vous préférez l’email&nbsp;?{' '}
    <a
      href="mailto:bruy.benoit@gmail.com"
      className="font-medium text-[#2563eb] hover:underline"
    >
      bruy.benoit@gmail.com
    </a>{' '}
    ·{' '}
    <a
      href="https://www.linkedin.com/in/benoit-bruynbroeck-a21214b4/"
      target="_blank"
      rel="noreferrer"
      className="font-medium text-[#2563eb] hover:underline"
    >
      LinkedIn
    </a>
  </p>
</div>
```

- [ ] **Step 3: Verify it builds**

Run: `npx next build 2>&1 | grep -E "✓ Compiled|error|Failed" | head -5`
Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: embed contact form in home page contact section"
```

---

### Task 6: Visual + behavior verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server (if not already running)**

```bash
npm run dev
```

- [ ] **Step 2: Screenshot the form at desktop and mobile**

Use the headless browser to capture `http://localhost:3000/#contact` at 1440 and 375 widths. Read the PNGs. Confirm the form matches the site style (blue focus ring, `btnBlue` button) and is not overflowing on mobile.

- [ ] **Step 3: Verify server-side validation error state**

Submit the empty form; confirm per-field error messages render (`aria-invalid` + red text) and the page does not navigate away.

- [ ] **Step 4: Note the end-to-end limitation**

Real email delivery requires `RESEND_API_KEY` in `.env.local`. Without it, the action returns the graceful "indisponible" error — confirm that message renders. Full send is verified once the key is set (handled separately via Resend setup).

- [ ] **Step 5: Run the unit tests once more**

Run: `npm test`
Expected: PASS.
