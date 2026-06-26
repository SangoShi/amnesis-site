import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { auth } from '@/lib/auth';

const dir = path.join(process.cwd(), 'content', 'factions');

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  const { content } = await request.json();
  fs.writeFileSync(path.join(dir, `${slug}.mdx`), content, 'utf-8');
  return NextResponse.json({ success: true, slug });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug } = await params;
  const filePath = path.join(dir, `${slug}.mdx`);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  return NextResponse.json({ success: true });
}
