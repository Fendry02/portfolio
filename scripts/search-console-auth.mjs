import { createServer } from 'node:http'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { randomBytes } from 'node:crypto'

import {
  createAuthorizationUrl,
  createCodeChallenge,
  createCodeVerifier,
} from './search-console-lib.mjs'

const tokenDirectory = '.search-console'
const tokenPath = path.join(tokenDirectory, 'token.json')
const redirectPort = Number.parseInt(
  process.env.GOOGLE_SEARCH_CONSOLE_REDIRECT_PORT ?? '42813',
  10,
)
const redirectUri = `http://127.0.0.1:${redirectPort}/oauth2/callback`

function getRequiredEnvironmentValue(name) {
  const value = process.env[name]?.trim()

  if (!value) {
    throw new Error(
      `${name} is required. See the Search Console OAuth setup in README.md.`,
    )
  }

  return value
}

function sendHtml(response, statusCode, message) {
  response.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' })
  response.end(
    `<!doctype html><title>Google Search Console</title><p>${message}</p>`,
  )
}

async function exchangeAuthorizationCode({
  code,
  codeVerifier,
  clientId,
  clientSecret,
}) {
  const body = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
    code_verifier: codeVerifier,
  })
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      payload?.error_description ?? 'Google token exchange failed.',
    )
  }

  if (!payload.refresh_token) {
    throw new Error(
      'Google did not provide a refresh token. Revoke the app access and try again.',
    )
  }

  return payload
}

async function saveToken(token) {
  await mkdir(tokenDirectory, { recursive: true })
  await writeFile(tokenPath, `${JSON.stringify(token, null, 2)}\n`, {
    mode: 0o600,
  })
}

async function getExistingRefreshToken() {
  try {
    const token = JSON.parse(await readFile(tokenPath, 'utf8'))
    return token.refresh_token
  } catch {
    return undefined
  }
}

async function main() {
  const clientId = getRequiredEnvironmentValue(
    'GOOGLE_SEARCH_CONSOLE_CLIENT_ID',
  )
  const clientSecret = getRequiredEnvironmentValue(
    'GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET',
  )
  const existingRefreshToken = await getExistingRefreshToken()

  if (existingRefreshToken) {
    console.log(
      'Une autorisation locale existe déjà dans .search-console/token.json.',
    )
    return
  }

  if (
    !Number.isInteger(redirectPort) ||
    redirectPort < 1 ||
    redirectPort > 65535
  ) {
    throw new Error('GOOGLE_SEARCH_CONSOLE_REDIRECT_PORT must be a valid port.')
  }

  const state = randomBytes(32).toString('hex')
  const codeVerifier = createCodeVerifier()
  const authorizationUrl = createAuthorizationUrl({
    clientId,
    redirectUri,
    state,
    codeChallenge: createCodeChallenge(codeVerifier),
  })

  const result = await new Promise((resolve, reject) => {
    const server = createServer(async (request, response) => {
      const callbackUrl = new URL(request.url, redirectUri)

      if (callbackUrl.pathname !== '/oauth2/callback') {
        sendHtml(response, 404, 'Page introuvable.')
        return
      }

      const authorizationError = callbackUrl.searchParams.get('error')
      const callbackState = callbackUrl.searchParams.get('state')
      const code = callbackUrl.searchParams.get('code')

      if (authorizationError || callbackState !== state || !code) {
        sendHtml(response, 400, 'Autorisation refusée ou invalide.')
        server.close()
        reject(
          new Error(authorizationError ?? 'Google authorization was invalid.'),
        )
        return
      }

      try {
        const token = await exchangeAuthorizationCode({
          code,
          codeVerifier,
          clientId,
          clientSecret,
        })
        await saveToken(token)
        sendHtml(
          response,
          200,
          'Autorisation enregistrée. Vous pouvez fermer cette fenêtre.',
        )
        server.close()
        resolve()
      } catch (error) {
        sendHtml(response, 500, 'Impossible d’enregistrer l’autorisation.')
        server.close()
        reject(error)
      }
    })

    server.once('error', reject)
    server.listen(redirectPort, '127.0.0.1', () => {
      console.log('Ouvre cette URL dans ton navigateur, puis autorise Google :')
      console.log(authorizationUrl)
    })
  })

  return result
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
