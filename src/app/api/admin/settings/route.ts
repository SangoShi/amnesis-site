import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Password change via env vars is not supported on Vercel
  // User needs to update GITHUB_TOKEN or env vars manually
  return NextResponse.json({
    success: true,
    message: 'Change password by updating ADMIN_PASSWORD_HASH in Vercel environment variables'
  });
}
