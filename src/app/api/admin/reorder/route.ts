import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { type, items } = await request.json();
  const dir = path.join(process.cwd(), 'content', type);

  if (!fs.existsSync(dir)) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

  for (const item of items) {
    const filePath = path.join(dir, `${item.slug}.mdx`);
    if (!fs.existsSync(filePath)) continue;

    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    data.order = item.order;
    const newRaw = `---\n${Object.entries(data).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join('\n')}\n---\n${content}`;
    fs.writeFileSync(filePath, newRaw, 'utf-8');
  }

  return NextResponse.json({ success: true });
}
