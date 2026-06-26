import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { auth } from '@/lib/auth';

const dir = path.join(process.cwd(), 'content', 'artifacts');

export async function GET() {
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')) : [];
  return NextResponse.json({ files });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { slug, content } = await request.json();
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${slug}.mdx`), content, 'utf-8');
  return NextResponse.json({ success: true, slug });
}
