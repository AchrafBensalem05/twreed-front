// app/api/orders/[id]/route.js
import { customFetch } from '@/lib/fetch'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(_, { params }) {
  const token = cookies().get('token')?.value
  try {
    const order = await customFetch(`/orders/${params.id}`, {
      method: 'GET',
      withAuth: true,
      token,
    })
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 404 })
  }
}

export async function PUT(req, { params }) {
  const token = cookies().get('token')?.value
  const data = await req.json()
  try {
    const order = await customFetch(`/orders/${params.id}`, {
      method: 'PUT',
      body: data,
      withAuth: true,
      token,
    })
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}

export async function DELETE(_, { params }) {
  const token = cookies().get('token')?.value
  try {
    await customFetch(`/orders/${params.id}`, {
      method: 'DELETE',
      withAuth: true,
      token,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 })
  }
}
