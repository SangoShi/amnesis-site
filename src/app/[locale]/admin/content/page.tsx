import ContentEditor from '@/components/admin/ContentEditor';

export default async function AdminContentPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl text-accent">SITE CONTENT</h1>
      <ContentEditor />
    </div>
  );
}
