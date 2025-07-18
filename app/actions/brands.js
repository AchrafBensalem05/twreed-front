// app/actions/brands.js
'use server'

import { customFetch } from '@/lib/fetch'

// Get all brands
export async function getAllBrands() {
  return await customFetch('/brands', { method: 'GET' })
}

// Get single category
export async function getBrand(id) {
  return await customFetch(`/brands/${id}`, { method: 'GET' })
}
