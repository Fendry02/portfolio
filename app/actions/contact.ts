'use server'

import { Resend } from 'resend'

import {
  contactSchema,
  isLikelyBot,
  buildSubject,
  buildHtml,
} from '@/app/lib/contact'

// Sender must be an address on a domain verified in Resend. Set CONTACT_FROM
// (e.g. contact@bbenoit.fr) in the environment once the domain is verified;
// until then it falls back to Resend's shared test sender.
const FROM = process.env.CONTACT_FROM ?? 'onboarding@resend.dev'
const TO = process.env.CONTACT_TO ?? 'bruy.benoit@gmail.com'

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
