import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // TODO: Replace with actual DB logic later
    console.log('✅ SIGNUP:', name, email);
    return NextResponse.json({ message: 'Signup successful!' });
  } catch (err) {
    console.error('❌ Signup error:', err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
