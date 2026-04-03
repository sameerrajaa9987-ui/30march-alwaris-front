import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DEPARTMENT_OPTIONS,
  isDepartment,
} from "@/modules/masters/employee/constants";
import type { EmployeeDepartment } from "@/modules/masters/employee/types";

export type EmployeeFiltersValue = {
  search: string;
  department: "" | EmployeeDepartment;
  activeOnly: boolean;
  approvedOnly: boolean;
};

export function EmployeeFilters({
  value,
  onChange,
}: {
  value: EmployeeFiltersValue;
  onChange: (next: EmployeeFiltersValue) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
        <div className="md:col-span-6">
          <label className="text-xs font-medium text-muted-foreground">
            Search
          </label>
          <Input
            placeholder="Employee ID, Name, Email, City, State..."
            value={value.search}
            onChange={(e) => onChange({ ...value, search: e.target.value })}
          />
        </div>

        <div className="md:col-span-3">
          <label className="text-xs font-medium text-muted-foreground">
            Department
          </label>
          <Select
            value={value.department}
            onValueChange={(v) =>
              onChange({ ...value, department: isDepartment(v) ? v : "" })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-3">
          <label className="text-xs font-medium text-muted-foreground opacity-0">
            Filters
          </label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-foreground/85">
              <Checkbox
                checked={value.activeOnly}
                onCheckedChange={(checked) =>
                  onChange({ ...value, activeOnly: Boolean(checked) })
                }
              />
              <span>Active only</span>
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-foreground/85">
              <Checkbox
                checked={value.approvedOnly}
                onCheckedChange={(checked) =>
                  onChange({ ...value, approvedOnly: Boolean(checked) })
                }
              />
              <span>Approved only</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
