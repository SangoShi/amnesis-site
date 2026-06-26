import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { auth } from '@/lib/auth';

const filePath = path.join(process.cwd(), 'content', 'universes.json');

export async function GET() {
  const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : [];
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const universes = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : [];
  universes.push(body);
  universes.sort((a: { order: number }, b: { order: number }) => a.order - b.order);
  fs.writeFileSync(filePath, JSON.stringify(universes, null, 2), 'utf-8');

  return NextResponse.json({ success: true });
}
