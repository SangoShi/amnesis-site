import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { auth } from '@/lib/auth';

const filePath = path.join(process.cwd(), 'content', 'timeline.json');

function readTimeline() {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeTimeline(data: unknown[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  return NextResponse.json(readTimeline());
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const timeline = readTimeline();
  timeline.push(body);
  writeTimeline(timeline);
  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { index, data } = await request.json();
  const timeline = readTimeline();
  if (index >= 0 && index < timeline.length) {
    timeline[index] = data;
    writeTimeline(timeline);
  }
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { index } = await request.json();
  const timeline = readTimeline();
  if (index >= 0 && index < timeline.length) {
    timeline.splice(index, 1);
    writeTimeline(timeline);
  }
  return NextResponse.json({ success: true });
}
