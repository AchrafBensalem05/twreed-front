// app/api/auth/login/route.js
import { NextResponse } from 'next/server'
import { customFetch } from '@/lib/fetch'
import { cookies } from 'next/headers'

export async function POST(req) {
  try {
    const data = await req.json()

    const response = await customFetch('/auth/login', {
      method: 'POST',
      body: data,
    })

    const res = NextResponse.json(response)

    if (response?.token) {
      const cookieStore = await cookies()
      cookieStore.set("token", response.token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
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
