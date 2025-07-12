// app/api/seller/route.js
import { customFetch } from '@/lib/fetch'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req) {
  const data = await req.json()
  const token = cookies().get('token')?.value
  try {
    const response = await customFetch('/sellers', {
      method: 'POST',
      body: data,
      withAuth: true,
      token,
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
