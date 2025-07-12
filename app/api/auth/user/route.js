// app/api/auth/user/route.js
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { customFetch } from '@/lib/fetch'

export async function GET() {
  try {
    const token = cookies().get('token')?.value

    const user = await customFetch('/auth/user', {
      method: 'GET',
      withAuth: true,
      token,
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status || 401 }
    )
  }
}
