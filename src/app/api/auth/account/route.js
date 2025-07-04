import { NextResponse } from 'next/server';

export async function GET() {
  // You'd normally read a cookie or session to get user info
  // For now, return a dummy user
  const fakeUser = {
    name: 'Riddhi Patel',
    email: 'riddhi@example.com',
  };

  return NextResponse.json(fakeUser);
}
