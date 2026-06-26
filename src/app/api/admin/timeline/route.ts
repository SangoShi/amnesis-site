import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getFile, updateFile } from '@/lib/github';

export async function GET() {
  const file = await getFile('content/timeline.json');
  if (!file) return NextResponse.json([]);
  return NextResponse.json(JSON.parse(file.content));
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const file = await getFile('content/timeline.json');
  const timeline = file ? JSON.parse(file.content) : [];
  timeline.push(body);

  const ok = await updateFile('content/timeline.json', JSON.stringify(timeline, null, 2), file!.sha, 'feat: add timeline event');
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Failed' }, { status: 500 });
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { index, data } = await request.json();
  const file = await getFile('content/timeline.json');
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const timeline = JSON.parse(file.content);
  if (index >= 0 && index < timeline.length) {
    timeline[index] = data;
  }

  const ok = await updateFile('content/timeline.json', JSON.stringify(timeline, null, 2), file.sha, 'update: timeline event');
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Failed' }, { status: 500 });
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { index } = await request.json();
  const file = await getFile('content/timeline.json');
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const timeline = JSON.parse(file.content);
  if (index >= 0 && index < timeline.length) {
    timeline.splice(index, 1);
  }

  const ok = await updateFile('content/timeline.json', JSON.stringify(timeline, null, 2), file.sha, 'delete: timeline event');
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: 'Failed' }, { status: 500 });
}
