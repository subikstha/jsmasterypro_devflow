// When a user visits /api/tickets then the following function is executed

import { NextResponse } from 'next/server';

import { tickets } from '@/app/database';

export async function GET() {
  return NextResponse.json(tickets);
}

export async function POST(request: Request) {
  const ticket = await request.json();

  tickets.push({ id: tickets.length + 1, ...ticket });

  return NextResponse.json(tickets);
}