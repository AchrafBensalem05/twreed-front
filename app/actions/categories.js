// app/actions/categories.js
'use server'

import { customFetch } from '@/lib/fetch'

// Get all categories
export async function getAllCategories() {
  return await customFetch('/categories', { method: 'GET' })
}

// Get single category
export async function getCategory(id) {
  return await customFetch(`/categories/${id}`, { method: 'GET' })
}
