// lib/fetch.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export async function customFetch(
  endpoint,
  {
    method = 'GET',
    query = {},
    body = null,
    headers = {},
    withAuth = false,
    token = null,
    cookies = null,
    cache = 'no-store',
    next = null,
    signal = null,
  } = {}
) {
  // Build query string
  const queryString = Object.entries(query)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')

  const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`

  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  // Add Authorization if needed
  if (withAuth) {
    const finalToken = token || getTokenFromCookies(cookies)
    if (finalToken) {
      defaultHeaders['Authorization'] = `Bearer ${finalToken}`
    }
  }

  const options = {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    cache,
    signal,
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  if (next !== null) {
    options.next = { revalidate: next }
  }

  try {
    const res = await fetch(url, options)

    if (!res.ok) {
      const errData = await parseResponse(res)
      const error = new Error(errData?.message || res.statusText)
      error.status = res.status
      error.data = errData

      throw error
    }

    return await parseResponse(res)
  } catch (error) {
    console.error(`[customFetch] ${method} ${url} →`, error)
    throw error
  }
}

function getTokenFromCookies(cookies) {
  if (!cookies) return null
  if (typeof cookies === 'string') {
    const match = cookies.match(/(?:^|; )token=([^;]*)/)
    return match ? decodeURIComponent(match[1]) : null
  }
  if (cookies.get) {
    // Next.js server (cookies.get("token"))
    return cookies.get('token')?.value || null
  }
  return null
}

async function parseResponse(res) {
  const contentType = res.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return await res.json()
  }
  return await res.text()
}
