// app/api/seller/route.js
import { customFetch } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const data = await req.json()
  try {
    const response = await customFetch('/sellers', {
      method: 'POST',
      body: data,
      withAuth: true,
    })
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}

export async function GET() {
  try {
    const sellers = await customFetch('/sellers', { method: 'GET' })
    return NextResponse.json(sellers)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
