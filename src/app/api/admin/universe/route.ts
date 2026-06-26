import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getFile, updateFile } from '@/lib/github';

export async function GET() {
  const file = await getFile('content/universes.json');
  if (!file) return NextResponse.json([]);
  return NextResponse.json(JSON.parse(file.content));
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const file = await getFile('content/universes.json');
  const universes = file ? JSON.parse(file.content) : [];
  universes.push(body);
  universes.sort((a: { order: number }, b: { order: number }) => a.order - b.order);

  const ok = await updateFile(
    'content/universes.json',
    JSON.stringify(universes, null, 2),
    file!.sha,
    `feat: add universe ${body.slug}`
  );
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Failed' }, { status: 500 });
}
