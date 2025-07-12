// app/actions/products.js
'use server'

import { customFetch } from '@/lib/fetch'

// List all products (with filters if needed)
export async function getAllProducts(query = {}) {
  return await customFetch('/products', {
    method: 'GET',
    query,
  })
}

// Get one product
export async function getProduct(id) {
  return await customFetch(`/products/${id}`, {
    method: 'GET',
  })
}

// Get products by seller ID
export async function getProductsBySeller(sellerId) {
  return await customFetch(`/sellers/${sellerId}/products`, {
    method: 'GET',
  })
}

// Create product (seller only)
export async function createProduct(data, cookies = null, token = null) {
  return await customFetch('/products', {
    method: 'POST',
    body: data,
    withAuth: true,
    cookies,
    token,
  })
}


