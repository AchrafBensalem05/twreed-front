import { NextResponse } from 'next/server';
import { customFetch } from '@/lib/fetch';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const data = await req.json();
    const response = await customFetch('/auth/register', {
      method: 'POST',
      body: data,
    });

    if (!response.token) {
      return NextResponse.json({ message: response.message || 'Registration failed' }, { status: 400 });
    }

    // Set HttpOnly cookie
    const res = NextResponse.json({ user: response.user });
    res.cookies.set('token', response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return res;
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Registration failed' }, { status: 500 });
  }
} 