import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getFile, updateFile, deleteFile } from '@/lib/github';

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug } = await params;
  const body = await request.json();
  const file = await getFile('content/universes.json');
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const universes = JSON.parse(file.content);
  const index = universes.findIndex((u: { slug: string }) => u.slug === slug);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  universes[index] = { ...universes[index], ...body };
  universes.sort((a: { order: number }, b: { order: number }) => a.order - b.order);

  const ok = await updateFile('content/universes.json', JSON.stringify(universes, null, 2), file.sha, `update: universe ${slug}`);
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Failed' }, { status: 500 });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug } = await params;
  const file = await getFile('content/universes.json');
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const universes = JSON.parse(file.content).filter((u: { slug: string }) => u.slug !== slug);
  const ok = await updateFile('content/universes.json', JSON.stringify(universes, null, 2), file.sha, `delete: universe ${slug}`);
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Failed' }, { status: 500 });
}
