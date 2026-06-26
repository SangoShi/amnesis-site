import ActivityLog from '@/components/ui/ActivityLog';

export default function Footer() {
  return (
    <footer
      className="border-t border-accent/20 bg-background py-8"
      style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <p className="mb-2 text-xs uppercase text-muted/40">&gt; Лог системы</p>
          <ActivityLog />
        </div>
        <div className="border-t border-purple/10 pt-4 text-center">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} SHINAGAVE&apos;S BESTIARY
          </p>
          <a
            href="https://t.me/sangoshi"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block rounded-full bg-green/10 px-4 py-1 text-sm text-green transition-all hover:bg-green/20"
          >
            t.me/sangoshi
          </a>
          <p className="mt-4 text-[10px] text-muted/20">Ctrl+Shift+T</p>
        </div>
      </div>
    </footer>
  );
}
