// app/api/orders/cart/remove/route.js
import { cookies } from 'next/headers'
import { customFetch } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function DELETE(req) {
  const token = cookies().get('token')?.value
  const body = await req.json()

  try {
    const result = await customFetch('/orders/cart/remove', {
      method: 'DELETE',
      body,
      withAuth: true,
      token,
    })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
