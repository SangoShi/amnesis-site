import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get('file') as File;
  const folder = (formData.get('folder') as string) || 'characters';

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public', 'images', folder);
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const filename = file.name.replace(/[^a-z0-9._-]/gi, '_').toLowerCase();
  const filePath = path.join(uploadDir, filename);
  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ path: `/images/${folder}/${filename}` });
}
