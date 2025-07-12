// app/actions/seller.js
'use server'

import { customFetch } from '@/lib/fetch'

// Get current seller's profile (requires token or cookies)
export async function getMySeller(cookies = null, token = null) {
  return await customFetch('/sellers/me', {
    method: 'GET',
    withAuth: true,
    cookies,
    token,
  })
}

// Update current seller's profile
export async function updateMySeller(data, cookies = null, token = null) {
  return await customFetch('/sellers/me', {
    method: 'PUT',
    body: data,
    withAuth: true,
    cookies,
    token,
  })
}

// Get public seller by ID
export async function getSellerById(id) {
  return await customFetch(`/sellers/${id}`, {
    method: 'GET',
  })
}

// Create new seller profile (after registration if needed)
export async function createSeller(data, cookies = null, token = null) {
  return await customFetch('/sellers', {
    method: 'POST',
    body: data,
    withAuth: true,
    cookies,
    token,
  })
}

// Optional: Get all sellers
export async function getAllSellers(query = {}) {
  return await customFetch('/sellers', {
    method: 'GET',
    query,
  })
}
