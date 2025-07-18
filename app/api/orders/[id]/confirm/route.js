// app/api/orders/[id]/confirm/route.js
import { customFetch } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function POST(_, { params }) {

  try {
    const result = await customFetch(`/orders/${params.id}/confirm`, {
      method: 'POST',
      withAuth: true,
    })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
