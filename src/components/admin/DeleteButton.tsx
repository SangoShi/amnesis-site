'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ apiPath, label = '[DEL]' }: { apiPath: string; label?: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Вы уверены? / Are you sure?')) return;
    setDeleting(true);
    try {
      const res = await fetch(apiPath, { method: 'DELETE' });
      if (res.ok) router.refresh();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="rounded-full bg-red/10 px-3 py-1 text-xs text-red transition-all hover:bg-red/20 disabled:opacity-50"
    >
      {deleting ? '...' : label}
    </button>
  );
}
