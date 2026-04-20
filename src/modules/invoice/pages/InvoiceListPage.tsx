import { useMemo, useState } from "react";
import { Loader2, Pencil, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useCreateInvoice,
  useInvoiceJobOptions,
  useSearchInvoiceMutation,
  useUpdateInvoice,
} from "@/modules/invoice/hooks/useInvoice";
import type {
  InvoiceLineItem,
  InvoicePayload,
  InvoiceRecord,
  InvoiceTableRow,
  InvoiceType,
} from "@/modules/invoice/types";
import { InvoiceLineItemEditDialog } from "@/modules/invoice/components/InvoiceLineItemEditDialog";
import { InvoiceMainEditDialog } from "@/modules/invoice/components/InvoiceMainEditDialog";
import { getApiErrorMessage } from "@/shared/api/http";
import { toast } from "@/shared/lib/toast";

const INVOICE_TYPE_OPTIONS: InvoiceType[] = ["Proforma", "Tax Invoice"];
const PAYABLE_AT_OPTIONS = ["AED", "USD"] as const;
const BANK_OPTIONS = [
  "DUBAI ISLAMIC BANK (AED)",
  "ABU DHABI ISLAMIC BANK",
  "ABU DHABI ISLAMIC BANK (AED)",
] as const;

function formatDate(value?: string) {
  if (!value) return "-";
  return value.split("T")[0] ?? value;
}

function formatAmount(value?: number) {
  return Number(value || 0).toFixed(2);
}

function toPayload(record: InvoiceRecord): InvoicePayload {
  const payload: Partial<InvoiceRecord> = { ...record };
  delete payload.id;
  return payload as InvoicePayload;
}

function toMainRow(invoice: InvoiceRecord): InvoiceTableRow {
  return {
    id: invoice.id,
    jobNo: invoice.jobNo,
    code: "",
    customerName: invoice.customerName,
    jobDate: invoice.jobDate,
    invoiceNo: invoice.invoiceNo,
    invoiceDate: invoice.invoiceDate,
    branch: invoice.branch,
    amount: invoice.amount,
    tax: invoice.tax,
    totalAmount: invoice.totalAmount,
    payAmount: invoice.payAmount,
    tdsAmount: invoice.tdsAmount,
    balanceAmount: invoice.balanceAmount,
    voyage: invoice.voyage,
    vesselName: invoice.vesselName,
    pol: invoice.pol,
    fpod: invoice.fpod,
    cgst: invoice.cgst,
    sgst: invoice.sgst,
    igst: invoice.igst,
    exRate: invoice.exRate,
    actualJob: invoice.actualJob,
    actualInvoice: invoice.actualInvoice,
    credit: invoice.credit,
    creditDate: invoice.creditDate,
    remarks: invoice.remarks,
    createdBy: invoice.createdBy,
    checker: invoice.checker,
    checkedBy: invoice.checkedBy,
    creditDays: invoice.creditDays,
    wht: invoice.wht,
    actualTotal: invoice.actualTotal,
  };
}

export function InvoiceListPage({ defaultType }: { defaultType: InvoiceType }) {
  const [jobNo, setJobNo] = useState<string>("");
  const [invoiceType, setInvoiceType] = useState<InvoiceType>(defaultType);

  const [tableRows, setTableRows] = useState<InvoiceTableRow[]>([]);
  const [invoice, setInvoice] = useState<InvoiceRecord | null>(null);
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([]);

  const [lineItemDialogOpen, setLineItemDialogOpen] = useState(false);
  const [mainDialogOpen, setMainDialogOpen] = useState(false);
  const [editingLineItem, setEditingLineItem] =
    useState<InvoiceLineItem | null>(null);

  const { data: jobOptions = [], isLoading: isLoadingJobOptions } =
    useInvoiceJobOptions();
  const searchMutation = useSearchInvoiceMutation();
  const createMutation = useCreateInvoice();
  const updateMutation = useUpdateInvoice();

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const jobNoOptions = useMemo(
    () =>
      jobOptions.map((item) => Number(item.jobNo)).filter((item) => item > 0),
    [jobOptions],
  );

  function recalcInvoiceFromLineItems(rows: InvoiceLineItem[]) {
    const amount = Number(
      rows.reduce((sum, row) => sum + Number(row.amount || 0), 0).toFixed(2),
    );
    const tax = Number(
      rows
        .reduce(
          (sum, row) =>
            sum +
            Number(row.gstVatAmount || 0) +
            Number(row.cgstAmount || 0) +
            Number(row.sgstAmount || 0) +
            Number(row.igstAmount || 0),
          0,
        )
        .toFixed(2),
    );
    const totalAmount = Number(
      rows
        .reduce((sum, row) => sum + Number(row.totalAmount || 0), 0)
        .toFixed(2),
    );
    const wht = Number(
      rows.reduce((sum, row) => sum + Number(row.whtAmount || 0), 0).toFixed(2),
    );

    setInvoice((prev) => {
      if (!prev) return prev;
      const next = {
        ...prev,
        amount,
        tax,
        totalAmount,
        wht,
        actualTotal: totalAmount,
        balanceAmount: Number(
          (
            totalAmount -
            Number(prev.payAmount || 0) -
            Number(prev.tdsAmount || 0)
          ).toFixed(2),
        ),
        lineItems: rows,
      };

      setTableRows([toMainRow(next)]);
      return next;
    });
  }

  async function onSearch() {
    if (!jobNo) {
      toast.warning("Please select Job No");
      return;
    }

    try {
      const data = await searchMutation.mutateAsync({
        jobNo: Number(jobNo),
        invoiceType,
      });

      const selected = {
        ...data.selectedInvoice,
        invoiceType,
        lineItems: data.lineItems,
      } as InvoiceRecord;

      setTableRows(data.tableRows);
      setInvoice(selected);
      setLineItems(data.lineItems);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      setTableRows([]);
      setInvoice(null);
      setLineItems([]);
    }
  }

  function onEditMain() {
    if (!invoice) return;
    setMainDialogOpen(true);
  }

  function onEditLineItem(row: InvoiceLineItem) {
    setEditingLineItem(row);
    setLineItemDialogOpen(true);
  }

  function onDeleteLineItem(id: string) {
    const next = lineItems.filter((row) => row.id !== id);
    setLineItems(next);
    recalcInvoiceFromLineItems(next);
  }

  function onSaveLineItem(updated: InvoiceLineItem) {
    const next = lineItems.map((row) =>
      row.id === updated.id ? updated : row,
    );
    setLineItems(next);
    recalcInvoiceFromLineItems(next);
  }

  function onSaveMain(updated: InvoiceRecord) {
    setInvoice(updated);
    setTableRows([toMainRow(updated)]);
  }

  async function onSaveInvoice() {
    if (!invoice) {
      toast.warning("No invoice data available");
      return;
    }

    try {
      const payload = toPayload({
        ...invoice,
        invoiceType,
        lineItems,
      });

      if (invoice.id.startsWith("draft-")) {
        const created = await createMutation.mutateAsync(payload);
        setInvoice(created as InvoiceRecord);
        setTableRows([toMainRow(created as InvoiceRecord)]);
        toast.success("Invoice created successfully");
      } else {
        const updated = await updateMutation.mutateAsync({
          id: invoice.id,
          payload,
        });
        setInvoice(updated as InvoiceRecord);
        setTableRows([toMainRow(updated as InvoiceRecord)]);
        toast.success("Invoice updated successfully");
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return (
    <div className="erp-page pb-4">
      <section className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
        <div className="mb-3 space-y-1">
          <h1 className="text-lg font-semibold">Invoice</h1>
          <p className="text-sm text-muted-foreground">
            Select Job No and Invoice Type, then click Search to load invoice
            data.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="space-y-1 md:col-span-3">
            <div className="text-xs font-medium text-muted-foreground">
              Job No
            </div>
            <Select
              value={jobNo}
              onValueChange={(value) => {
                setJobNo(value || "");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select job no" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingJobOptions ? (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Loading...
                  </div>
                ) : (
                  jobNoOptions.map((option) => (
                    <SelectItem key={option} value={String(option)}>
                      {option}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 md:col-span-3">
            <div className="text-xs font-medium text-muted-foreground">
              Invoice Type
            </div>
            <Select
              value={invoiceType}
              onValueChange={(value) =>
                setInvoiceType((value || "Proforma") as InvoiceType)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select invoice type" />
              </SelectTrigger>
              <SelectContent>
                {INVOICE_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end md:col-span-2">
            <Button
              type="button"
              onClick={onSearch}
              disabled={searchMutation.isPending}
              className="h-10 w-full md:w-auto"
            >
              {searchMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 size-4" />
                  Search
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold">Invoice Table</h2>
        <div className="overflow-auto rounded-lg border border-border">
          <Table className="min-w-[2200px]">
            <TableHeader>
              <TableRow>
                <TableHead>Edit</TableHead>
                <TableHead>Job No</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Job Date</TableHead>
                <TableHead>Invoice No</TableHead>
                <TableHead>Invoice Date</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Pay Amount</TableHead>
                <TableHead>TDS Amount</TableHead>
                <TableHead>Balance Amount</TableHead>
                <TableHead>Voyage</TableHead>
                <TableHead>Vessel Name</TableHead>
                <TableHead>POL</TableHead>
                <TableHead>FPOD</TableHead>
                <TableHead>CGST</TableHead>
                <TableHead>SGST</TableHead>
                <TableHead>IGST</TableHead>
                <TableHead>Ex Rate</TableHead>
                <TableHead>Actual Job</TableHead>
                <TableHead>Actual Invoice</TableHead>
                <TableHead>Credit</TableHead>
                <TableHead>Credit Date</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Checker</TableHead>
                <TableHead>Checked By</TableHead>
                <TableHead>Credit Days</TableHead>
                <TableHead>WHT</TableHead>
                <TableHead>Actual Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={33}>
                    Search to load invoice records.
                  </TableCell>
                </TableRow>
              ) : (
                tableRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={onEditMain}
                      >
                        <Pencil className="mr-2 size-4" />
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>{row.jobNo}</TableCell>
                    <TableCell>{row.code || "-"}</TableCell>
                    <TableCell>{row.customerName || "-"}</TableCell>
                    <TableCell>{formatDate(row.jobDate)}</TableCell>
                    <TableCell>{row.invoiceNo || "-"}</TableCell>
                    <TableCell>{formatDate(row.invoiceDate)}</TableCell>
                    <TableCell>{row.branch || "-"}</TableCell>
                    <TableCell>{formatAmount(row.amount)}</TableCell>
                    <TableCell>{formatAmount(row.tax)}</TableCell>
                    <TableCell>{formatAmount(row.totalAmount)}</TableCell>
                    <TableCell>{formatAmount(row.payAmount)}</TableCell>
                    <TableCell>{formatAmount(row.tdsAmount)}</TableCell>
                    <TableCell>{formatAmount(row.balanceAmount)}</TableCell>
                    <TableCell>{row.voyage || "-"}</TableCell>
                    <TableCell>{row.vesselName || "-"}</TableCell>
                    <TableCell>{row.pol || "-"}</TableCell>
                    <TableCell>{row.fpod || "-"}</TableCell>
                    <TableCell>{formatAmount(row.cgst)}</TableCell>
                    <TableCell>{formatAmount(row.sgst)}</TableCell>
                    <TableCell>{formatAmount(row.igst)}</TableCell>
                    <TableCell>{formatAmount(row.exRate)}</TableCell>
                    <TableCell>{formatAmount(row.actualJob)}</TableCell>
                    <TableCell>{formatAmount(row.actualInvoice)}</TableCell>
                    <TableCell>{formatAmount(row.credit)}</TableCell>
                    <TableCell>{formatDate(row.creditDate)}</TableCell>
                    <TableCell>{row.remarks || "-"}</TableCell>
                    <TableCell>{row.createdBy || "-"}</TableCell>
                    <TableCell>{row.checker || "-"}</TableCell>
                    <TableCell>{row.checkedBy || "-"}</TableCell>
                    <TableCell>{row.creditDays}</TableCell>
                    <TableCell>{formatAmount(row.wht)}</TableCell>
                    <TableCell>{formatAmount(row.actualTotal)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold">Payable Section</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="space-y-1 md:col-span-3">
            <div className="text-xs font-medium text-muted-foreground">
              Payable At
            </div>
            <Select
              value={invoice?.payableAt || "AED"}
              onValueChange={(value) =>
                setInvoice((prev) =>
                  prev
                    ? { ...prev, payableAt: (value || "AED") as "AED" | "USD" }
                    : prev,
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select payable at" />
              </SelectTrigger>
              <SelectContent>
                {PAYABLE_AT_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 md:col-span-4">
            <div className="text-xs font-medium text-muted-foreground">
              Bank Name
            </div>
            <Select
              value={invoice?.bankName || "DUBAI ISLAMIC BANK (AED)"}
              onValueChange={(value) =>
                setInvoice((prev) =>
                  prev
                    ? {
                        ...prev,
                        bankName: value || "DUBAI ISLAMIC BANK (AED)",
                      }
                    : prev,
                )
              }
            >
              <SelectTrigger className="w-full">
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
      </section>

      <section className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold">Invoice Line Items</h2>
        <div className="overflow-auto rounded-lg border border-border">
          <Table className="min-w-[2400px]">
            <TableHeader>
              <TableRow>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
                <TableHead>Job No</TableHead>
                <TableHead>Invoice No</TableHead>
                <TableHead>Job Date</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Service Code</TableHead>
                <TableHead>GST/VAT</TableHead>
                <TableHead>GST/VAT Amount</TableHead>
                <TableHead>CGST</TableHead>
                <TableHead>CGST Amount</TableHead>
                <TableHead>SGST</TableHead>
                <TableHead>SGST Amount</TableHead>
                <TableHead>IGST</TableHead>
                <TableHead>IGST Amount</TableHead>
                <TableHead>WHT</TableHead>
                <TableHead>WHT Amount</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Remark</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lineItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={27}>No line items loaded.</TableCell>
                </TableRow>
              ) : (
                lineItems.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => onEditLineItem(row)}
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
                        onClick={() => onDeleteLineItem(row.id)}
                      >
                        <Trash2 className="mr-2 size-4" />
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell>{row.jobNo}</TableCell>
                    <TableCell>{row.invoiceNo || "-"}</TableCell>
                    <TableCell>{formatDate(row.jobDate)}</TableCell>
                    <TableCell>{row.code || "-"}</TableCell>
                    <TableCell>{row.description || "-"}</TableCell>
                    <TableCell>{row.chargedPer || "-"}</TableCell>
                    <TableCell>{row.currency || "-"}</TableCell>
                    <TableCell>{row.size || "-"}</TableCell>
                    <TableCell>{row.type || "-"}</TableCell>
                    <TableCell>{row.qty}</TableCell>
                    <TableCell>{formatAmount(row.rate)}</TableCell>
                    <TableCell>{formatAmount(row.amount)}</TableCell>
                    <TableCell>{row.serviceCode || "-"}</TableCell>
                    <TableCell>{formatAmount(row.gstVat)}</TableCell>
                    <TableCell>{formatAmount(row.gstVatAmount)}</TableCell>
                    <TableCell>{formatAmount(row.cgst)}</TableCell>
                    <TableCell>{formatAmount(row.cgstAmount)}</TableCell>
                    <TableCell>{formatAmount(row.sgst)}</TableCell>
                    <TableCell>{formatAmount(row.sgstAmount)}</TableCell>
                    <TableCell>{formatAmount(row.igst)}</TableCell>
                    <TableCell>{formatAmount(row.igstAmount)}</TableCell>
                    <TableCell>{formatAmount(row.wht)}</TableCell>
                    <TableCell>{formatAmount(row.whtAmount)}</TableCell>
                    <TableCell>{formatAmount(row.totalAmount)}</TableCell>
                    <TableCell>{row.remark || "-"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={onSaveInvoice}
          disabled={!invoice || isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>

      <InvoiceLineItemEditDialog
        open={lineItemDialogOpen}
        onOpenChange={setLineItemDialogOpen}
        value={editingLineItem}
        onSave={onSaveLineItem}
      />

      <InvoiceMainEditDialog
        key={`${invoice?.id ?? "no-invoice"}-${mainDialogOpen ? "open" : "closed"}`}
        open={mainDialogOpen}
        onOpenChange={setMainDialogOpen}
        value={invoice}
        jobOptions={jobNoOptions}
        onSave={onSaveMain}
      />
    </div>
  );
}
