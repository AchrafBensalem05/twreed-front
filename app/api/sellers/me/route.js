// app/api/seller/me/route.js
import { cookies } from 'next/headers'
import { customFetch } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function GET() {
  const token = cookies().get('token')?.value
  try {
    const seller = await customFetch('/sellers/me', {
      method: 'GET',
      withAuth: true,
      token,
    })
    return NextResponse.json(seller)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}

export async function PUT(req) {
  const token = cookies().get('token')?.value
  const data = await req.json()
  try {
    const seller = await customFetch('/sellers/me', {
      method: 'PUT',
      body: data,
      withAuth: true,
      token,
    })
    return NextResponse.json(seller)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
