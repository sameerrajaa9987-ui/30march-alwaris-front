import { useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InvoiceField } from "@/modules/invoice/components/InvoiceField";
import type {
  InvoicePayment,
  InvoicePaymentType,
  InvoiceRecord,
} from "@/modules/invoice/types";
import { invoiceMainEditSchema } from "@/modules/invoice/validations/invoice.validation";
import { toast } from "@/shared/lib/toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAYMENT_TYPE_OPTIONS: InvoicePaymentType[] = [
  "CHEQUE",
  "CASH",
  "BANK TRANSFER",
];

const BANK_OPTIONS = [
  "DUBAI ISLAMIC BANK (AED)",
  "ABU DHABI ISLAMIC BANK",
  "ABU DHABI ISLAMIC BANK (AED)",
] as const;

type InvoiceMainEditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: InvoiceRecord | null;
  jobOptions: number[];
  onSave: (value: InvoiceRecord) => void;
};

function toNumber(value: string | number | null | undefined) {
  const next = Number(value);
  return Number.isFinite(next) ? next : 0;
}

function blankPayment(invoiceNo: string): InvoicePayment {
  return {
    id: `${Date.now()}-${Math.random()}`,
    vocNo: "",
    vocDate: "",
    invoice: invoiceNo || "",
    payAmount: 0,
    tdsAmount: 0,
    clientBank: "",
    bankBranch: "",
    clientAcNo: "",
    payType: "BANK TRANSFER",
    chequeNo: "",
    ourBank: "",
    tokenNo: "",
    paymentDate: "",
  };
}

export function InvoiceMainEditDialog({
  open,
  onOpenChange,
  value,
  jobOptions,
  onSave,
}: InvoiceMainEditDialogProps) {
  const [form, setForm] = useState<InvoiceRecord | null>(value);
  const [paymentDraft, setPaymentDraft] = useState<InvoicePayment>(
    blankPayment(value?.invoiceNo || ""),
  );
  const [editingPaymentId, setEditingPaymentId] = useState<string | null>(null);

  const validationError = useMemo(() => {
    if (!form) return "";
    const parsed = invoiceMainEditSchema.safeParse(form);
    if (!parsed.success) {
      return parsed.error.issues[0]?.message || "Invalid invoice form";
    }
    return "";
  }, [form]);

  function patch(next: Partial<InvoiceRecord>) {
    setForm((prev) => {
      if (!prev) return prev;
      const merged = { ...prev, ...next };
      merged.balanceAmount = Number(
        (
          Number(merged.totalAmount || 0) -
          Number(merged.payAmount || 0) -
          Number(merged.tdsAmount || 0)
        ).toFixed(2),
      );
      return merged;
    });
  }

  function addOrUpdatePayment() {
    setForm((prev) => {
      if (!prev) return prev;

      const row = {
        ...paymentDraft,
        invoice: paymentDraft.invoice || prev.invoiceNo,
      };

      if (editingPaymentId) {
        return {
          ...prev,
          payments: prev.payments.map((item) =>
            item.id === editingPaymentId ? row : item,
          ),
        };
      }

      return {
        ...prev,
        payments: [...prev.payments, row],
      };
    });

    setPaymentDraft(blankPayment(form?.invoiceNo || ""));
    setEditingPaymentId(null);
  }

  function editPayment(row: InvoicePayment) {
    setPaymentDraft({ ...row });
    setEditingPaymentId(row.id);
  }

  function deletePayment(id: string) {
    setForm((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        payments: prev.payments.filter((item) => item.id !== id),
      };
    });

    if (editingPaymentId === id) {
      setEditingPaymentId(null);
      setPaymentDraft(blankPayment(form?.invoiceNo || ""));
    }
  }

  if (!form) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-2rem)] overflow-y-auto sm:w-[1150px] sm:max-w-[1150px]">
        <DialogHeader>
          <DialogTitle>Invoice Main Edit + Payment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-3 rounded-lg border border-border bg-background p-3">
            <h3 className="text-sm font-semibold">Invoice Details</h3>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Job No
                </label>
                <div className="mt-1">
                  <Select
                    value={String(form.jobNo || "")}
                    onValueChange={(v) => patch({ jobNo: toNumber(v || 0) })}
                  >
                    <SelectTrigger className="h-9 w-full">
                      <SelectValue placeholder="Select job no" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobOptions.map((option) => (
                        <SelectItem key={option} value={String(option)}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
                  label="Invoice Date"
                  type="date"
                  value={form.invoiceDate ? form.invoiceDate.split("T")[0] : ""}
                  onChange={(v) => patch({ invoiceDate: v })}
                />
              </div>
              <div className="md:col-span-4">
                <InvoiceField
                  label="Party Name"
                  value={form.partyName}
                  onChange={(v) => patch({ partyName: v, customerName: v })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Exchange Rate"
                  type="number"
                  value={form.exRate}
                  onChange={(v) => patch({ exRate: toNumber(v) })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Total Amt"
                  type="number"
                  value={form.totalAmount}
                  readOnly
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="TDS Amt"
                  type="number"
                  value={form.tdsAmount}
                  onChange={(v) => patch({ tdsAmount: toNumber(v) })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Payment Amt"
                  type="number"
                  value={form.payAmount}
                  onChange={(v) => patch({ payAmount: toNumber(v) })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Balance Amt"
                  type="number"
                  value={form.balanceAmount}
                  readOnly
                />
              </div>
              <div className="md:col-span-6">
                <InvoiceField
                  label="Remark"
                  value={form.remarks}
                  onChange={(v) => patch({ remarks: v })}
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Credit Days"
                  type="number"
                  value={form.creditDays}
                  onChange={(v) => patch({ creditDays: toNumber(v) })}
                />
              </div>
            </div>
          </div>
          <div className="space-y-3 rounded-lg border border-border bg-background p-3">
            <div className="text-sm font-semibold">Payment Detail Section</div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
              <div className="md:col-span-3">
                <label className="text-xs font-medium text-muted-foreground">
                  Payment Type
                </label>
                <div className="mt-1">
                  <Select
                    value={paymentDraft.payType}
                    onValueChange={(v) =>
                      setPaymentDraft((prev) => ({
                        ...prev,
                        payType:
                          ((v || "BANK TRANSFER") as InvoicePaymentType) ||
                          "BANK TRANSFER",
                      }))
                    }
                  >
                    <SelectTrigger className="h-9 w-full">
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYMENT_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="text-xs font-medium text-muted-foreground">
                  Bank Detail
                </label>
                <div className="mt-1">
                  <Select
                    value={paymentDraft.ourBank || ""}
                    onValueChange={(v) =>
                      setPaymentDraft((prev) => ({
                        ...prev,
                        ourBank: v || "",
                        clientBank: prev.clientBank || v || "",
                      }))
                    }
                  >
                    <SelectTrigger className="h-9 w-full">
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {BANK_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="md:col-span-3">
                <InvoiceField
                  label="Payment Date"
                  type="date"
                  value={paymentDraft.paymentDate}
                  onChange={(v) =>
                    setPaymentDraft((prev) => ({
                      ...prev,
                      paymentDate: v,
                      vocDate: prev.vocDate || v,
                    }))
                  }
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Payment Amt"
                  type="number"
                  value={paymentDraft.payAmount}
                  onChange={(v) =>
                    setPaymentDraft((prev) => ({
                      ...prev,
                      payAmount: toNumber(v),
                    }))
                  }
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="TDS Amount"
                  type="number"
                  value={paymentDraft.tdsAmount}
                  onChange={(v) =>
                    setPaymentDraft((prev) => ({
                      ...prev,
                      tdsAmount: toNumber(v),
                    }))
                  }
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Bank Name"
                  value={paymentDraft.clientBank}
                  onChange={(v) =>
                    setPaymentDraft((prev) => ({
                      ...prev,
                      clientBank: v,
                    }))
                  }
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Cheque No"
                  value={paymentDraft.chequeNo}
                  onChange={(v) =>
                    setPaymentDraft((prev) => ({
                      ...prev,
                      chequeNo: v,
                    }))
                  }
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="A/C No"
                  value={paymentDraft.clientAcNo}
                  onChange={(v) =>
                    setPaymentDraft((prev) => ({
                      ...prev,
                      clientAcNo: v,
                    }))
                  }
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Branch"
                  value={paymentDraft.bankBranch}
                  onChange={(v) =>
                    setPaymentDraft((prev) => ({
                      ...prev,
                      bankBranch: v,
                    }))
                  }
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Voc No"
                  value={paymentDraft.vocNo}
                  onChange={(v) =>
                    setPaymentDraft((prev) => ({
                      ...prev,
                      vocNo: v,
                    }))
                  }
                />
              </div>
              <div className="md:col-span-3">
                <InvoiceField
                  label="Token No"
                  value={paymentDraft.tokenNo}
                  onChange={(v) =>
                    setPaymentDraft((prev) => ({
                      ...prev,
                      tokenNo: v,
                    }))
                  }
                />
              </div>
            </div>

            <div>
              <Button type="button" onClick={addOrUpdatePayment} size="sm">
                <Plus className="mr-2 size-4" />
                Add Record
              </Button>
            </div>

            <div className="overflow-auto rounded-lg border border-border">
              <Table className="min-w-[1200px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Edit</TableHead>
                    <TableHead>Delete</TableHead>
                    <TableHead>Voc No</TableHead>
                    <TableHead>Voc Date</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Pay Amount</TableHead>
                    <TableHead>TDS Amount</TableHead>
                    <TableHead>Client Bank</TableHead>
                    <TableHead>Bank Branch</TableHead>
                    <TableHead>Client Ac.No</TableHead>
                    <TableHead>Pay Type</TableHead>
                    <TableHead>Cheque No</TableHead>
                    <TableHead>Our Bank</TableHead>
                    <TableHead>Token No</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {form.payments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={14}>No payment records</TableCell>
                    </TableRow>
                  ) : (
                    form.payments.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => editPayment(row)}
                          >
                            <Pencil className="mr-2 size-4" />
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => deletePayment(row.id)}
                          >
                            <Trash2 className="mr-2 size-4" />
                            Delete
                          </Button>
                        </TableCell>
                        <TableCell>{row.vocNo || "-"}</TableCell>
                        <TableCell>{row.vocDate || "-"}</TableCell>
                        <TableCell>{row.invoice || "-"}</TableCell>
                        <TableCell>
                          {Number(row.payAmount || 0).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {Number(row.tdsAmount || 0).toFixed(2)}
                        </TableCell>
                        <TableCell>{row.clientBank || "-"}</TableCell>
                        <TableCell>{row.bankBranch || "-"}</TableCell>
                        <TableCell>{row.clientAcNo || "-"}</TableCell>
                        <TableCell>{row.payType || "-"}</TableCell>
                        <TableCell>{row.chequeNo || "-"}</TableCell>
                        <TableCell>{row.ourBank || "-"}</TableCell>
                        <TableCell>{row.tokenNo || "-"}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {validationError ? (
          <div className="mt-1 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {validationError}
          </div>
        ) : null}

        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (!form || validationError) {
                toast.error(validationError || "Invalid invoice data");
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
