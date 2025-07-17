'use server'
import { customFetch } from '@/lib/fetch'

export async function registerUser(data) {
  return await customFetch('/auth/register', {
    method: 'POST',
    body: data,
  })
}

export async function getCurrentUser(cookies = null, token = null) {
  return await customFetch('/auth/me', {
    method: 'GET',
    withAuth: true,
    cookies,
    token,
  })
}

export async function sendEmailConfirmation({ email }) {
  // Send confirmation email
  return  await customFetch('/send-confirmation-code', {
    method: 'POST',
    body: { email },
  });
}

export async function validateEmailConfirmation({ email, otp }) {
  return await customFetch('/verify-code', {
    method: 'POST',
    body: { email, code: otp },
  });
}
