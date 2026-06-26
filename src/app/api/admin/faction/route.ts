import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { listFiles, createFile } from '@/lib/github';

export async function GET() {
  const files = await listFiles('content/factions');
  return NextResponse.json({ files: files.map((f) => f.name) });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug, content } = await request.json();
  const ok = await createFile(`content/factions/${slug}.mdx`, content, `feat: add faction ${slug}`);
  return ok
    ? NextResponse.json({ success: true, slug })
    : NextResponse.json({ error: 'Failed' }, { status: 500 });
}
