// app/api/orders/[id]/confirm/route.js
import { cookies } from 'next/headers'
import { customFetch } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function POST(_, { params }) {
  const token = cookies().get('token')?.value

  try {
    const result = await customFetch(`/orders/${params.id}/confirm`, {
      method: 'POST',
      withAuth: true,
      token,
    })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
