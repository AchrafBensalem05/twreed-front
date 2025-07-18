// app/api/categories/[id]/route.js
import { customFetch } from '@/lib/fetch'
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
  const data = await req.json()

  try {
    const category = await customFetch(`/categories/${params.id}`, {
      method: 'PUT',
      body: data,
      withAuth: true,
    })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}

export async function DELETE(_, { params }) {

  try {
    await customFetch(`/categories/${params.id}`, {
      method: 'DELETE',
      withAuth: true,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
