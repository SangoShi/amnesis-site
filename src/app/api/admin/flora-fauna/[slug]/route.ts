import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getFile, updateFile, deleteFile } from '@/lib/github';

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug } = await params;
  const { content } = await request.json();
  const file = await getFile(`content/flora-fauna/${slug}.mdx`);
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const ok = await updateFile(`content/flora-fauna/${slug}.mdx`, content, file.sha, `update: flora-fauna ${slug}`);
  return ok
    ? NextResponse.json({ success: true, slug })
    : NextResponse.json({ error: 'Failed' }, { status: 500 });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug } = await params;
  const file = await getFile(`content/flora-fauna/${slug}.mdx`);
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const ok = await deleteFile(`content/flora-fauna/${slug}.mdx`, file.sha, `delete: flora-fauna ${slug}`);
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Failed' }, { status: 500 });
}
