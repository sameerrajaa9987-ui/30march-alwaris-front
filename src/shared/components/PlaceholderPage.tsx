export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="erp-page">
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-sm text-slate-600">Module coming next.</div>
      </div>
    </div>
  );
}
