import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { auth } from '@/lib/auth';

const envPath = path.join(process.cwd(), '.env.local');

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { newPassword } = await request.json();
  if (!newPassword || newPassword.length < 4) {
    return NextResponse.json({ error: 'Password too short' }, { status: 400 });
  }

  const hash = await bcrypt.hash(newPassword, 10);

  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
    envContent = envContent.replace(/ADMIN_PASSWORD_HASH=.*/, `ADMIN_PASSWORD_HASH=${hash}`);
  } else {
    envContent = `ADMIN_USERNAME=admin\nADMIN_PASSWORD_HASH=${hash}\nNEXTAUTH_SECRET=amnesis-secret-key`;
  }

  fs.writeFileSync(envPath, envContent, 'utf-8');

  return NextResponse.json({ success: true });
}
