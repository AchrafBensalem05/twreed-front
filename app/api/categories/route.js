// app/api/categories/route.js
import { customFetch } from '@/lib/fetch'
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
  const data = await req.json()

  try {
    const category = await customFetch('/categories', {
      method: 'POST',
      body: data,
      withAuth: true,
    })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
