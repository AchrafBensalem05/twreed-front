// app/api/auth/login/route.js
import { NextResponse } from 'next/server'
import { customFetch } from '@/lib/fetch'

export async function POST(req) {
  try {
    const data = await req.json()

    const response = await customFetch('/auth/login', {
      method: 'POST',
      body: data,
    })

    const res = NextResponse.json(response)

    if (response?.token) {
      res.cookies.set('token', response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      })
    }

    return res
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        errors: error.data || null,
      },
      {
        status: error.status || 500,
      }
    )
  }
}
