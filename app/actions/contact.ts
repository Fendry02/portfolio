'use server'

import {
  contactSchema,
  isLikelyBot,
  buildSubject,
  buildHtml,
} from '@/app/lib/contact'
import { siteConfig } from '@/app/lib/seo'

// Sender must be a verified sender or authenticated domain in Brevo. Set
// CONTACT_FROM (e.g. contact@bbenoit.fr) in the environment; it defaults to
// the site owner's email, which can be verified in Brevo as a single sender.
const FROM = process.env.CONTACT_FROM ?? siteConfig.email
const TO = process.env.CONTACT_TO ?? 'bruy.benoit@gmail.com'
const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email'

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

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    console.error('[contact] BREVO_API_KEY is not set')
    return {
      status: 'error',
      message:
        "L'envoi est momentanément indisponible. Écrivez-moi directement par email.",
    }
  }

  try {
    const response = await fetch(BREVO_ENDPOINT, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: siteConfig.name, email: FROM },
        to: [{ email: TO }],
        replyTo: { email: parsed.data.email, name: parsed.data.name },
        subject: buildSubject(parsed.data),
        htmlContent: buildHtml(parsed.data),
      }),
    })

    if (!response.ok) {
      const detail = await response.text()
      console.error('[contact] Brevo error', response.status, detail)
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
