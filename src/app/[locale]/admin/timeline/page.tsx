import TimelineEditor from '@/components/admin/TimelineEditor';

export default async function AdminTimelinePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl text-accent">TIMELINE</h1>
      <TimelineEditor />
    </div>
  );
}
