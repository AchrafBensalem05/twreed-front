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

// Create new category (admin)
export async function createCategory(data, cookies = null, token = null) {
  return await customFetch('/categories', {
    method: 'POST',
    body: data,
    withAuth: true,
    cookies,
    token,
  })
}

// Update category (admin)
export async function updateCategory(id, data, cookies = null, token = null) {
  return await customFetch(`/categories/${id}`, {
    method: 'PUT',
    body: data,
    withAuth: true,
    cookies,
    token,
  })
}

// Delete category (admin)
export async function deleteCategory(id, cookies = null, token = null) {
  return await customFetch(`/categories/${id}`, {
    method: 'DELETE',
    withAuth: true,
    cookies,
    token,
  })
}
