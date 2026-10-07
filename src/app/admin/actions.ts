'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');
  
  // Basic hardcoded check for MVP Phase 1
  if (email === 'admin@opsai.com' && password === 'admin') {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated_admin_mock_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    redirect('/admin');
  } else {
    // Return error, handled by form state if used, or throw
    throw new Error('Invalid credentials');
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}
