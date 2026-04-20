import { Input } from "@/components/ui/input";

export function InvoiceField({
  label,
  value,
  onChange,
  readOnly,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  type?: "text" | "number" | "date";
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div className="mt-1">
        <Input
          type={type}
          value={String(value ?? "")}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          className="h-9"
        />
      </div>
    </div>
  );
}
