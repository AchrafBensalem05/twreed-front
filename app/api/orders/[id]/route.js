// app/api/orders/[id]/route.js
import { customFetch } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function GET(_, { params }) {
  try {
    const order = await customFetch(`/orders/${params.id}`, {
      method: 'GET',
      withAuth: true,
    })
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 404 })
  }
}

export async function PUT(req, { params }) {
  const data = await req.json()
  try {
    const order = await customFetch(`/orders/${params.id}`, {
      method: 'PUT',
      body: data,
      withAuth: true,
    })
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}

export async function DELETE(_, { params }) {
  try {
    await customFetch(`/orders/${params.id}`, {
      method: 'DELETE',
      withAuth: true,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
