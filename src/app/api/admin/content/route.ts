import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { auth } from '@/lib/auth';

const filePath = path.join(process.cwd(), 'content', 'site.json');

export async function GET() {
  const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : {};
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');

  return NextResponse.json({ success: true });
}
