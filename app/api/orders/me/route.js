// app/api/orders/me/route.js
import { customFetch } from '@/lib/fetch'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const token = cookies().get('token')?.value

  try {
    const orders = await customFetch('/orders/me', {
      method: 'GET',
      withAuth: true,
      token,
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}

