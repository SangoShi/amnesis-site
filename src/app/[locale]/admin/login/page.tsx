import LoginForm from '@/components/admin/LoginForm';

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <LoginForm locale={locale} />;
}
