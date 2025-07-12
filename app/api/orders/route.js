// app/api/orders/route.js
import { customFetch } from '@/lib/fetch'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const token = cookies().get('token')?.value
  const { searchParams } = new URL(req.url)
  const query = Object.fromEntries(searchParams.entries())

  try {
    const orders = await customFetch('/orders', {
      method: 'GET',
      query,
      withAuth: true,
      token,
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}

export async function POST(req) {
  const data = await req.json()
  const token = cookies().get('token')?.value

  try {
    const order = await customFetch('/orders', {
      method: 'POST',
      body: data,
      withAuth: true,
      token,
    })
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
