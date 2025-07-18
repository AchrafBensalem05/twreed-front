// app/api/orders/[id]/logs/route.js
import { customFetch } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function GET(_, { params }) {
  try {
    const logs = await customFetch(`/orders/${params.id}/logs`, {
      method: 'GET',
      withAuth: true,
    })
    return NextResponse.json(logs)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
