// app/actions/orders.js
'use server'

import { customFetch } from '@/lib/fetch'

// Get all orders (admin only)
export async function getAllOrders(query = {}, cookies = null, token = null) {
  return await customFetch('/orders', {
    method: 'GET',
    query,
    withAuth: true,
    cookies,
    token,
  })
}

// Get current user's orders (client)
export async function getMyOrders(cookies = null, token = null) {
  return await customFetch('/orders/me', {
    method: 'GET',
    withAuth: true,
    cookies,
    token,
  })
}

// Get one order
export async function getOrder(id, cookies = null, token = null) {
  return await customFetch(`/orders/${id}`, {
    method: 'GET',
    withAuth: true,
    cookies,
    token,
  })
}

// Create new order (client)
export async function createOrder(data, cookies = null, token = null) {
  return await customFetch('/orders', {
    method: 'POST',
    body: data,
    withAuth: true,
    cookies,
    token,
  })
}

// Update order (status, notes)
export async function updateOrder(id, data, cookies = null, token = null) {
  return await customFetch(`/orders/${id}`, {
    method: 'PUT',
    body: data,
    withAuth: true,
    cookies,
    token,
  })
}

// Cancel/Delete order
export async function deleteOrder(id, cookies = null, token = null) {
  return await customFetch(`/orders/${id}`, {
    method: 'DELETE',
    withAuth: true,
    cookies,
    token,
  })
}

// Get logs for an order
export async function getOrderLogs(id, cookies = null, token = null) {
  return await customFetch(`/orders/${id}/logs`, {
    method: 'GET',
    withAuth: true,
    cookies,
    token,
  })
}
