// app/api/products/route.js
import { customFetch } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const query = Object.fromEntries(searchParams.entries())

  try {
    const products = await customFetch('/products', {
      method: 'GET',
      query,
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}