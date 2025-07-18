import { cookies } from 'next/headers';
import { customFetch } from '@/lib/fetch';

export async function GET() {
  const token = cookies().get('auth_token')?.value;
  if (!token) {
    return Response.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  try {
    const user = await customFetch('/auth/me', {
      method: 'GET',
      withAuth: true,
      token,
    });
    return Response.json({ user });
  } catch (error) {
    return Response.json({ error: error.message || 'Failed to fetch user' }, { status: 401 });
  }
} 