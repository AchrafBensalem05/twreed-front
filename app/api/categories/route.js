// app/api/categories/route.js
import { customFetch } from '@/lib/fetch'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const categories = await customFetch('/categories', { method: 'GET' })
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}

export async function POST(req) {
  const token = cookies().get('token')?.value
  const data = await req.json()

  try {
    const category = await customFetch('/categories', {
      method: 'POST',
      body: data,
      withAuth: true,
      token,
    })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
