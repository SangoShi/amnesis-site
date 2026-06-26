import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { auth } from '@/lib/auth';

const filePath = path.join(process.cwd(), 'content', 'universes.json');

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug } = await params;
  const body = await request.json();
  const universes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const index = universes.findIndex((u: { slug: string }) => u.slug === slug);

  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  universes[index] = { ...universes[index], ...body };
  universes.sort((a: { order: number }, b: { order: number }) => a.order - b.order);
  fs.writeFileSync(filePath, JSON.stringify(universes, null, 2), 'utf-8');

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug } = await params;
  const universes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const filtered = universes.filter((u: { slug: string }) => u.slug !== slug);
  fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), 'utf-8');

  return NextResponse.json({ success: true });
}
