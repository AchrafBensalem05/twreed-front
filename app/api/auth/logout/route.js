// app/api/auth/logout/route.js
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { customFetch } from '@/lib/fetch'

export async function POST() {
  try {
    const token = cookies().get('token')?.value

    await customFetch('/auth/logout', {
      method: 'POST',
      withAuth: true,
      token,
    })

    const res = NextResponse.json({ success: true })

    // Clear the cookie
    res.cookies.set('token', '', {
      path: '/',
      maxAge: 0,
    })

    return res
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status || 500 }
    )
  }
}
