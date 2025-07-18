// app/api/orders/cart/add/route.js
import { customFetch } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const body = await req.json()

  try {
    const result = await customFetch('/orders/cart/add', {
      method: 'POST',
      body,
      withAuth: true,
    })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
