export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="erp-page">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="mt-1 text-sm text-muted-foreground">
          Module coming next.
        </div>
      </div>
    </div>
  );
}
