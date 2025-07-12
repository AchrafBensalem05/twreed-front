'use server'

import { customFetch } from '@/lib/fetch'

// Get the current user's cart (status = cart)
export async function getCart(cookies = null, token = null) {
  return await customFetch('/orders/me?status=cart', {
    method: 'GET',
    withAuth: true,
    cookies,
    token,
  })
}

// Add a product to cart (creates or updates line item)
export async function addToCart(productId, quantity = 1, cookies = null, token = null) {
  return await customFetch('/orders/cart/add', {
    method: 'POST',
    body: { product_id: productId, quantity },
    withAuth: true,
    cookies,
    token,
  })
}

// Remove a product from cart
export async function removeFromCart(productId, cookies = null, token = null) {
  return await customFetch('/orders/cart/remove', {
    method: 'DELETE',
    body: { product_id: productId },
    withAuth: true,
    cookies,
    token,
  })
}

// Update product quantity in cart
export async function updateCartItem(productId, quantity, cookies = null, token = null) {
  return await customFetch('/orders/cart/update', {
    method: 'PUT',
    body: { product_id: productId, quantity },
    withAuth: true,
    cookies,
    token,
  })
}

// Confirm cart as an order
export async function orderNow(cartId, cookies = null, token = null) {
  return await customFetch(`/orders/${cartId}/confirm`, {
    method: 'POST',
    withAuth: true,
    cookies,
    token,
  })
}
