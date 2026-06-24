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
      {/* Honeypot: off-screen, off accessibility tree, off tab order */}
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
