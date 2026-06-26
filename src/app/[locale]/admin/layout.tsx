import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const session = await auth();
  const { locale } = await params;

  if (!session) {
    redirect(`/${locale}/login`);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-12">
      <div className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-8">
        <div className="md:sticky md:top-20 md:self-start">
          <AdminNav />
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
