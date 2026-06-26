import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getFile, updateFile, deleteFile } from '@/lib/github';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const file = await getFile(`content/characters/${slug}.mdx`);
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ slug, content: file.content });
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug } = await params;
  const { content } = await request.json();
  const file = await getFile(`content/characters/${slug}.mdx`);
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const ok = await updateFile(`content/characters/${slug}.mdx`, content, file.sha, `update: character ${slug}`);
  return ok
    ? NextResponse.json({ success: true, slug })
    : NextResponse.json({ error: 'Failed' }, { status: 500 });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug } = await params;
  const file = await getFile(`content/characters/${slug}.mdx`);
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const ok = await deleteFile(`content/characters/${slug}.mdx`, file.sha, `delete: character ${slug}`);
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Failed' }, { status: 500 });
}
