'use server'
import { customFetch } from '@/lib/fetch'

export async function registerUser(data) {
  return await customFetch('/auth/register', {
    method: 'POST',
    body: data,
  })
}

export async function getCurrentUser(cookies = null, token = null) {
  return await customFetch('/auth/user', {
    method: 'GET',
    withAuth: true,
    cookies,
    token,
  })
}
