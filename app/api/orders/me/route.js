// app/api/orders/me/route.js
import { customFetch } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function GET() {

  try {
    const orders = await customFetch('/orders/me', {
      method: 'GET',
      withAuth: true,
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}

