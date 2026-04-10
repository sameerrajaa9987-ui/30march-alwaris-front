import { Input } from "@/components/ui/input";
import type { SeaBookingFiltersValue } from "@/modules/booking/types";

export type { SeaBookingFiltersValue } from "@/modules/booking/types";

export function SeaBookingFilters({
  value,
  onChange,
}: {
  value: SeaBookingFiltersValue;
  onChange: (next: SeaBookingFiltersValue) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
        <div className="md:col-span-12">
          <label className="text-xs font-medium text-muted-foreground">
            Search
          </label>
          <Input
            placeholder="Job no, reference, shipper, consignee..."
            value={value.search}
            onChange={(e) => onChange({ ...value, search: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
