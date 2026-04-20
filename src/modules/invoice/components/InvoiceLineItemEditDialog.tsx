import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InvoiceField } from "@/modules/invoice/components/InvoiceField";
import { invoiceLineItemEditSchema } from "@/modules/invoice/validations/invoice.validation";
import type { InvoiceLineItem } from "@/modules/invoice/types";
import { toast } from "@/shared/lib/toast";

type InvoiceLineItemEditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: InvoiceLineItem | null;
  onSave: (value: InvoiceLineItem) => void;
};

function toNumber(value: string | number) {
  const next = Number(value);
  return Number.isFinite(next) ? next : 0;
}

function recalc(row: InvoiceLineItem): InvoiceLineItem {
  const amount = Number(
    (
      Number(row.qty || 0) *
      Number(row.rate || 0) *
      Number(row.exRate || 1)
    ).toFixed(2),
  );
  const gstVatAmount = Number(
    ((amount * Number(row.gstVat || 0)) / 100).toFixed(2),
  );
  const cgstAmount = Number(
    ((amount * Number(row.cgst || 0)) / 100).toFixed(2),
  );
  const sgstAmount = Number(
    ((amount * Number(row.sgst || 0)) / 100).toFixed(2),
  );
  const igstAmount = Number(
    ((amount * Number(row.igst || 0)) / 100).toFixed(2),
  );
  const whtAmount = Number(((amount * Number(row.wht || 0)) / 100).toFixed(2));
  const totalAmount = Number(
    (
      amount +
      gstVatAmount +
      cgstAmount +
      sgstAmount +
      igstAmount -
      whtAmount
    ).toFixed(2),
  );

  return {
    ...row,
    amount,
    gstVatAmount,
    cgstAmount,
    sgstAmount,
    igstAmount,
    whtAmount,
    totalAmount,
  };
}

export function InvoiceLineItemEditDialog({
  open,
  onOpenChange,
  value,
  onSave,
}: InvoiceLineItemEditDialogProps) {
  const [form, setForm] = useState<InvoiceLineItem | null>(value);

  useEffect(() => {
    setForm(value);
  }, [value]);

  const validationError = useMemo(() => {
    if (!form) return "";

    const parsed = invoiceLineItemEditSchema.safeParse(form);
    if (!parsed.success) {
      return parsed.error.issues[0]?.message || "Invalid line item";
    }

    return "";
  }, [form]);

  function patch(next: Partial<InvoiceLineItem>) {
    setForm((prev) => {
      if (!prev) return prev;
      return recalc({ ...prev, ...next });
    });
  }

  if (!form) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-2rem)] overflow-y-auto sm:w-[980px] sm:max-w-[980px]">
        <DialogHeader>
          <DialogTitle>Invoice Line Item Edit</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-3 rounded-lg border border-border bg-background p-3">
            <h3 className="text-sm font-semibold">Line Item</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
              <div className="md:col-span-2">
                <InvoiceField label="Job No" value={form.jobNo} readOnly />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Invoice No"
                  value={form.invoiceNo}
                  onChange={(v) => patch({ invoiceNo: v })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Currency"
                  value={form.currency}
                  onChange={(v) =>
                    patch({ currency: (v || "AED") as "AED" | "USD" })
                  }
                />
              </div>
              <div className="md:col-span-4">
                <InvoiceField
                  label="Code"
                  value={form.code}
                  onChange={(v) => patch({ code: v })}
                />
              </div>
              <div className="md:col-span-6">
                <InvoiceField
                  label="Description"
                  value={form.description}
                  onChange={(v) => patch({ description: v })}
                />
              </div>
              <div className="md:col-span-6">
                <InvoiceField
                  label="Remark"
                  value={form.remark}
                  onChange={(v) => patch({ remark: v })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Equipment (Charged Per)"
                  value={form.chargedPer}
                  onChange={(v) => patch({ chargedPer: v })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Size"
                  value={form.size}
                  onChange={(v) => patch({ size: v })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Type"
                  value={form.type}
                  onChange={(v) => patch({ type: v })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Ex Rate"
                  type="number"
                  value={form.exRate}
                  onChange={(v) => patch({ exRate: toNumber(v) })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Qty"
                  type="number"
                  value={form.qty}
                  onChange={(v) => patch({ qty: toNumber(v) })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Rate"
                  type="number"
                  value={form.rate}
                  onChange={(v) => patch({ rate: toNumber(v) })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Amount"
                  type="number"
                  value={form.amount}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-lg border border-border bg-background p-3">
            <h3 className="text-sm font-semibold">Tax Details</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
              <div className="md:col-span-3">
                <InvoiceField
                  label="VAT/GST %"
                  type="number"
                  value={form.gstVat}
                  onChange={(v) => patch({ gstVat: toNumber(v) })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="VAT/GST Amount"
                  type="number"
                  value={form.gstVatAmount}
                  readOnly
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="CGST %"
                  type="number"
                  value={form.cgst}
                  onChange={(v) => patch({ cgst: toNumber(v) })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="CGST Amount"
                  type="number"
                  value={form.cgstAmount}
                  readOnly
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="SGST %"
                  type="number"
                  value={form.sgst}
                  onChange={(v) => patch({ sgst: toNumber(v) })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="SGST Amount"
                  type="number"
                  value={form.sgstAmount}
                  readOnly
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="IGST %"
                  type="number"
                  value={form.igst}
                  onChange={(v) => patch({ igst: toNumber(v) })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="IGST Amount"
                  type="number"
                  value={form.igstAmount}
                  readOnly
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="WHT %"
                  type="number"
                  value={form.wht}
                  onChange={(v) => patch({ wht: toNumber(v) })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="WHT Amount"
                  type="number"
                  value={form.whtAmount}
                  readOnly
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Total Amount"
                  type="number"
                  value={form.totalAmount}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {validationError ? (
          <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {validationError}
          </div>
        ) : null}

        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (!form || validationError) {
                toast.error(validationError || "Invalid line item");
                return;
              }
              onSave(form);
              onOpenChange(false);
            }}
          >
            Save
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
