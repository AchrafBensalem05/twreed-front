// app/api/orders/cart/update/route.js
import { customFetch } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function PUT(req) {
  const body = await req.json()

  try {
    const result = await customFetch('/orders/cart/update', {
      method: 'PUT',
      body,
      withAuth: true,
    })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
