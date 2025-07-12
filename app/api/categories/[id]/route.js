// app/api/categories/[id]/route.js
import { customFetch } from '@/lib/fetch'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(_, { params }) {
  try {
    const category = await customFetch(`/categories/${params.id}`, {
      method: 'GET',
    })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 404 })
  }
}

export async function PUT(req, { params }) {
  const token = cookies().get('token')?.value
  const data = await req.json()

  try {
    const category = await customFetch(`/categories/${params.id}`, {
      method: 'PUT',
      body: data,
      withAuth: true,
      token,
    })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}

export async function DELETE(_, { params }) {
  const token = cookies().get('token')?.value

  try {
    await customFetch(`/categories/${params.id}`, {
      method: 'DELETE',
      withAuth: true,
      token,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
