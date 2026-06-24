import { z } from 'zod'

export const PROJECT_TYPES = [
  'Site vitrine',
  'Application web & mobile',
  'Audit & automatisation IA',
  'Formation IA',
  'Autre',
] as const

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Indiquez votre nom.').max(80, 'Nom trop long.'),
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
