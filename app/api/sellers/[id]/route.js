// app/api/seller/[id]/route.js
import { customFetch } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function GET(_, { params }) {
  try {
    const seller = await customFetch(`/sellers/${params.id}`, {
      method: 'GET',
    })
    return NextResponse.json(seller)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
