import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password required' }, { status: 400 });
    }

    // TODO: Add real user check
    console.log('✅ LOGIN:', email);
    return NextResponse.json({ message: 'Login successful!' });
  } catch (err) {
    console.error('❌ Login error:', err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
