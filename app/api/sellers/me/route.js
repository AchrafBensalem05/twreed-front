// app/api/seller/me/route.js
import { cookies } from 'next/headers'
import { customFetch } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const seller = await customFetch('/sellers/me', {
      method: 'GET',
      withAuth: true,
    })
    return NextResponse.json(seller)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}

export async function PUT(req) {
  const data = await req.json()
  try {
    const seller = await customFetch('/sellers/me', {
      method: 'PUT',
      body: data,
      withAuth: true,
    })
    return NextResponse.json(seller)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
