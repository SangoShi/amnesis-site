import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { auth } from '@/lib/auth';

const ffDir = path.join(process.cwd(), 'content', 'flora-fauna');

export async function GET() {
  const files = fs.existsSync(ffDir)
    ? fs.readdirSync(ffDir).filter((f) => f.endsWith('.mdx'))
    : [];
  return NextResponse.json({ files });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug, content } = await request.json();

  if (!fs.existsSync(ffDir)) {
    fs.mkdirSync(ffDir, { recursive: true });
  }

  const filePath = path.join(ffDir, `${slug}.mdx`);
  fs.writeFileSync(filePath, content, 'utf-8');

  return NextResponse.json({ success: true, slug });
}
