import { Input } from "@/components/ui/input";
import type { BillOfLadingFiltersValue } from "@/modules/bill-of-lading/types";

export function BillOfLadingFilters({
  value,
  onChange,
}: {
  value: BillOfLadingFiltersValue;
  onChange: (next: BillOfLadingFiltersValue) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <label className="text-xs font-medium text-muted-foreground">
        Search
      </label>
      <Input
        placeholder="BL Number, Job No, Reference, HBL, Container..."
        value={value.search}
        onChange={(e) => onChange({ ...value, search: e.target.value })}
        className="w-full max-w-xl"
      />
    </div>
  );
}
