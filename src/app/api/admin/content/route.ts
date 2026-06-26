import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getFile, updateFile } from '@/lib/github';

export async function GET() {
  const file = await getFile('content/site.json');
  if (!file) return NextResponse.json({});
  return NextResponse.json(JSON.parse(file.content));
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const file = await getFile('content/site.json');
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const ok = await updateFile('content/site.json', JSON.stringify(body, null, 2), file.sha, 'update: site content');
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Failed' }, { status: 500 });
}
