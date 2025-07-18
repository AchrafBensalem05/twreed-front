// app/api/orders/route.js
import { customFetch } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const query = Object.fromEntries(searchParams.entries())

  try {
    const orders = await customFetch('/orders', {
      method: 'GET',
      query,
      withAuth: true,
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}

export async function POST(req) {
  const data = await req.json()

  try {
    const order = await customFetch('/orders', {
      method: 'POST',
      body: data,
      withAuth: true,
    })
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
