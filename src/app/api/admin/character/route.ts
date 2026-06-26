import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { auth } from '@/lib/auth';

const charsDir = path.join(process.cwd(), 'content', 'characters');

export async function GET() {
  const files = fs.existsSync(charsDir)
    ? fs.readdirSync(charsDir).filter((f) => f.endsWith('.mdx'))
    : [];
  return NextResponse.json({ files });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug, content } = await request.json();

  if (!fs.existsSync(charsDir)) {
    fs.mkdirSync(charsDir, { recursive: true });
  }

  const filePath = path.join(charsDir, `${slug}.mdx`);
  fs.writeFileSync(filePath, content, 'utf-8');

  return NextResponse.json({ success: true, slug });
}
