// app/api/sellers/[id]/products/route.js
import { customFetch } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function GET(_, { params }) {
  try {
    const products = await customFetch(`/sellers/${params.id}/products`, {
      method: 'GET',
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
