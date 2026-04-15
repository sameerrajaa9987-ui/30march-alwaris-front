import { Input } from "@/components/ui/input";

export type CostSheetApprovalFiltersValue = {
  search: string;
};

export function CostSheetApprovalFilters({
  value,
  onChange,
}: {
  value: CostSheetApprovalFiltersValue;
  onChange: (next: CostSheetApprovalFiltersValue) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
        <div className="md:col-span-12">
          <label className="text-xs font-medium text-muted-foreground">
            Search
          </label>
          <Input
            value={value.search}
            onChange={(e) => onChange({ ...value, search: e.target.value })}
            placeholder="Job No, customer, shipper, consignee..."
          />
        </div>
      </div>
    </div>
  );
}
