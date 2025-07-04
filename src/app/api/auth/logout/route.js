import { NextResponse } from 'next/server';

export async function POST() {
  // Clear any session/cookie if you were using one
  // Here we just simulate logout

  return NextResponse.json({ message: 'Logged out successfully' });
}
