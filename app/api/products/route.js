// app/api/products/route.js
import { customFetch } from '@/lib/fetch'
import { cookies } from 'next/headers'
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

export async function POST(req) {
  const data = await req.json()
  const token = cookies().get('token')?.value

  try {
    const product = await customFetch('/products', {
      method: 'POST',
      body: data,
      withAuth: true,
      token,
    })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}

