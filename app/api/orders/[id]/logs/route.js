// app/api/orders/[id]/logs/route.js
import { customFetch } from '@/lib/fetch'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(_, { params }) {
  const token = cookies().get('token')?.value
  try {
    const logs = await customFetch(`/orders/${params.id}/logs`, {
      method: 'GET',
      withAuth: true,
      token,
    })
    return NextResponse.json(logs)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
