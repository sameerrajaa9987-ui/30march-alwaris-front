import { useMemo, useState } from "react";
import { Loader2, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type {
  CostSheetLineItem,
  CostSheetPayload,
  CostSheetStatus,
} from "@/modules/cost-sheet/types";
import { CostSheetLineItemsEditor } from "@/modules/cost-sheet/components/CostSheetLineItemsEditor";
import {
  useCostSheetBookingDetails,
  useCostSheetJobOptions,
  useCreateCostSheet,
} from "@/modules/cost-sheet/hooks/useCostSheet";
import { getApiErrorMessage } from "@/shared/api/http";
import { toast } from "@/shared/lib/toast";

function formatDate(value: string) {
  if (!value) return "-";
  return value.split("T")[0] ?? value;
}

function formatAmount(value: number) {
  return Number(value || 0).toFixed(2);
}

function toEditableRows(rows: CostSheetLineItem[]) {
  return rows.map((row, index) => ({
    ...row,
    id: row.id || `${Date.now()}-${index}`,
    qty: Number(row.qty || 0),
    rate: Number(row.rate || 0),
    amount: Number((Number(row.qty || 0) * Number(row.rate || 0)).toFixed(2)),
    remarks: row.remarks || "",
  }));
}

type Totals = {
  aedIncome: number;
  aedExpense: number;
  aedProfit: number;
  usdIncome: number;
  usdExpense: number;
  usdProfit: number;
};

type LineItemsDraft = {
  jobNo: number;
  income: CostSheetLineItem[];
  expense: CostSheetLineItem[];
};

function buildTotals(
  incomeRows: CostSheetLineItem[],
  expenseRows: CostSheetLineItem[],
): Totals {
  const sumByCurrency = (rows: CostSheetLineItem[], currency: "AED" | "USD") =>
    Number(
      rows
        .filter((row) => row.currency === currency)
        .reduce((sum, row) => sum + Number(row.amount || 0), 0)
        .toFixed(2),
    );

  const aedIncome = sumByCurrency(incomeRows, "AED");
  const aedExpense = sumByCurrency(expenseRows, "AED");
  const usdIncome = sumByCurrency(incomeRows, "USD");
  const usdExpense = sumByCurrency(expenseRows, "USD");

  return {
    aedIncome,
    aedExpense,
    aedProfit: Number((aedIncome - aedExpense).toFixed(2)),
    usdIncome,
    usdExpense,
    usdProfit: Number((usdIncome - usdExpense).toFixed(2)),
  };
}

function ReadOnlyField({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <Input readOnly value={String(value ?? "")} />
    </div>
  );
}

function TotalsInlineField({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[160px_1fr] items-center gap-2">
      <div className="text-sm font-medium">{label} :</div>
      <Input readOnly value={value} />
    </div>
  );
}

export function CostSheetCreatePage() {
  const [selectedJobNo, setSelectedJobNo] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"income" | "expense">("income");
  const [lineItemsDraft, setLineItemsDraft] = useState<LineItemsDraft | null>(
    null,
  );
  const [editingIncomeId, setEditingIncomeId] = useState<string | null>(null);
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [incomeEditBackup, setIncomeEditBackup] =
    useState<CostSheetLineItem | null>(null);
  const [expenseEditBackup, setExpenseEditBackup] =
    useState<CostSheetLineItem | null>(null);

  const selectedJobNoNumber = selectedJobNo ? Number(selectedJobNo) : null;

  const createMutation = useCreateCostSheet();
  const { data: jobOptions = [], isLoading: isJobOptionsLoading } =
    useCostSheetJobOptions();
  const {
    data: bookingDetails,
    isFetching: isBookingLoading,
    isError: isBookingError,
    error: bookingError,
  } = useCostSheetBookingDetails(selectedJobNoNumber);

  const defaultIncomeRows = useMemo(
    () => toEditableRows(bookingDetails?.incomeDetails || []),
    [bookingDetails],
  );

  const defaultExpenseRows = useMemo(
    () => toEditableRows(bookingDetails?.expenseDetails || []),
    [bookingDetails],
  );

  const currentDraft =
    selectedJobNoNumber !== null &&
    lineItemsDraft?.jobNo === selectedJobNoNumber
      ? lineItemsDraft
      : null;

  const incomeRows = currentDraft?.income ?? defaultIncomeRows;
  const expenseRows = currentDraft?.expense ?? defaultExpenseRows;

  const totals = useMemo(
    () => buildTotals(incomeRows, expenseRows),
    [incomeRows, expenseRows],
  );

  function updateCurrentDraft(
    updater: (draft: LineItemsDraft) => LineItemsDraft,
  ) {
    if (selectedJobNoNumber === null) return;

    setLineItemsDraft((prev) => {
      const baseDraft: LineItemsDraft =
        prev && prev.jobNo === selectedJobNoNumber
          ? prev
          : {
              jobNo: selectedJobNoNumber,
              income: defaultIncomeRows,
              expense: defaultExpenseRows,
            };

      return updater(baseDraft);
    });
  }

  function toUpdatedRow(
    row: CostSheetLineItem,
    field: "qty" | "rate" | "remarks",
    value: string,
  ): CostSheetLineItem {
    const nextQty = field === "qty" ? Number(value || 0) : row.qty;
    const nextRate = field === "rate" ? Number(value || 0) : row.rate;

    return {
      ...row,
      qty: Number(nextQty || 0),
      rate: Number(nextRate || 0),
      remarks: field === "remarks" ? value : row.remarks,
      amount: Number((Number(nextQty || 0) * Number(nextRate || 0)).toFixed(2)),
    };
  }

  function updateIncomeRow(
    rowId: string,
    field: "qty" | "rate" | "remarks",
    value: string,
  ) {
    updateCurrentDraft((draft) => {
      return {
        ...draft,
        income: draft.income.map((row) =>
          row.id === rowId ? toUpdatedRow(row, field, value) : row,
        ),
      };
    });
  }

  function updateExpenseRow(
    rowId: string,
    field: "qty" | "rate" | "remarks",
    value: string,
  ) {
    updateCurrentDraft((draft) => {
      return {
        ...draft,
        expense: draft.expense.map((row) =>
          row.id === rowId ? toUpdatedRow(row, field, value) : row,
        ),
      };
    });
  }

  function onStartIncomeEdit(row: CostSheetLineItem) {
    setEditingIncomeId(row.id);
    setIncomeEditBackup({ ...row });
  }

  function onSaveIncomeEdit() {
    setEditingIncomeId(null);
    setIncomeEditBackup(null);
  }

  function onCancelIncomeEdit() {
    if (editingIncomeId && incomeEditBackup) {
      updateCurrentDraft((draft) => {
        return {
          ...draft,
          income: draft.income.map((row) =>
            row.id === editingIncomeId ? { ...incomeEditBackup } : row,
          ),
        };
      });
    }
    setEditingIncomeId(null);
    setIncomeEditBackup(null);
  }

  function onStartExpenseEdit(row: CostSheetLineItem) {
    setEditingExpenseId(row.id);
    setExpenseEditBackup({ ...row });
  }

  function onSaveExpenseEdit() {
    setEditingExpenseId(null);
    setExpenseEditBackup(null);
  }

  function onCancelExpenseEdit() {
    if (editingExpenseId && expenseEditBackup) {
      updateCurrentDraft((draft) => {
        return {
          ...draft,
          expense: draft.expense.map((row) =>
            row.id === editingExpenseId ? { ...expenseEditBackup } : row,
          ),
        };
      });
    }
    setEditingExpenseId(null);
    setExpenseEditBackup(null);
  }

  async function submitCostSheet(status: CostSheetStatus) {
    if (!selectedJobNoNumber || selectedJobNoNumber <= 0) {
      toast.warning("Please select Job No");
      return;
    }

    if (
      status === "Pending Approval" &&
      incomeRows.length + expenseRows.length === 0
    ) {
      toast.warning("At least one income or expense row is required");
      return;
    }

    if (!bookingDetails) {
      toast.warning("Booking details not available");
      return;
    }

    const payload: CostSheetPayload = {
      jobNo: selectedJobNoNumber,
      bookingId: bookingDetails.bookingId,
      bookingParty: bookingDetails.bookingParty,
      shipper: bookingDetails.shipper,
      consignee: bookingDetails.consignee,
      portOfLoading: bookingDetails.portOfLoading,
      portOfDestination: bookingDetails.portOfDestination,
      modeOfTransport: bookingDetails.modeOfTransport,
      etd: bookingDetails.etd,
      eta: bookingDetails.eta,
      volume: Number(bookingDetails.volume || 0),
      grossWeight: Number(bookingDetails.grossWeight || 0),
      qty: Number(bookingDetails.qty || 0),
      incomeDetails: incomeRows.map((row) => ({
        chargeDescriptionId: row.chargeDescriptionId,
        chargeDescriptionName: row.chargeDescriptionName,
        chargeDescriptionCode: row.chargeDescriptionCode,
        billingPartyId: row.billingPartyId,
        billingPartyName: row.billingPartyName,
        chargedPer: row.chargedPer,
        qty: Number(row.qty || 0),
        size: row.size,
        type: row.type,
        currency: row.currency,
        rate: Number(row.rate || 0),
        amount: Number(row.amount || 0),
        remarks: row.remarks || "",
      })),
      expenseDetails: expenseRows.map((row) => ({
        chargeDescriptionId: row.chargeDescriptionId,
        chargeDescriptionName: row.chargeDescriptionName,
        chargeDescriptionCode: row.chargeDescriptionCode,
        vendorId: row.vendorId,
        vendorName: row.vendorName,
        chargedPer: row.chargedPer,
        qty: Number(row.qty || 0),
        size: row.size,
        type: row.type,
        currency: row.currency,
        rate: Number(row.rate || 0),
        amount: Number(row.amount || 0),
        remarks: row.remarks || "",
      })),
      status,
    };

    try {
      await createMutation.mutateAsync(payload);
      toast.success(
        status === "Pending Approval"
          ? "Cost sheet created for approval"
          : "Cost sheet saved as draft",
      );
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return (
    <div className="space-y-6 pb-6">
      <section className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-foreground">
            Create Cost Sheet
          </h1>
          <p className="text-sm text-muted-foreground">
            Select Job No from completed bookings and create a draft or pending
            approval cost sheet.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:max-w-[420px]">
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground">
              Job No
            </div>
            <Select
              value={selectedJobNo}
              onValueChange={(value) => {
                setSelectedJobNo(value ?? "");
                setLineItemsDraft(null);
                setEditingIncomeId(null);
                setEditingExpenseId(null);
                setIncomeEditBackup(null);
                setExpenseEditBackup(null);
              }}
            >
              <SelectTrigger className="w-full bg-background">
                <span className={cn(!selectedJobNo && "text-muted-foreground")}>
                  {selectedJobNo || "Select job number"}
                </span>
              </SelectTrigger>
              <SelectContent>
                {isJobOptionsLoading ? (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Loading...
                  </div>
                ) : jobOptions.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    No completed jobs found
                  </div>
                ) : (
                  jobOptions.map((option) => (
                    <SelectItem key={option.jobNo} value={String(option.jobNo)}>
                      {option.jobNo}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {isBookingLoading ? (
            <div className="inline-flex items-center gap-2 rounded-md bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Fetching booking details...
            </div>
          ) : null}
        </div>
      </section>

      {isBookingError ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {getApiErrorMessage(bookingError)}
        </div>
      ) : null}

      <section className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold">Party Details</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <ReadOnlyField
            label="Customer"
            value={bookingDetails?.bookingParty || ""}
          />
          <ReadOnlyField
            label="Shipper"
            value={bookingDetails?.shipper || ""}
          />
          <ReadOnlyField
            label="Consignee"
            value={bookingDetails?.consignee || ""}
          />
        </div>
      </section>

      <section className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold">Shipment Info</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <ReadOnlyField
            label="POL"
            value={bookingDetails?.portOfLoading || ""}
          />
          <ReadOnlyField
            label="POD"
            value={bookingDetails?.portOfDestination || ""}
          />
          <ReadOnlyField
            label="Mode"
            value={bookingDetails?.modeOfTransport || ""}
          />
          <ReadOnlyField
            label="ETD"
            value={formatDate(bookingDetails?.etd || "")}
          />
          <ReadOnlyField
            label="ETA"
            value={formatDate(bookingDetails?.eta || "")}
          />
        </div>
      </section>

      <section className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold">Cargo Info</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <ReadOnlyField
            label="Volume (CBM)"
            value={bookingDetails?.volume || 0}
          />
          <ReadOnlyField
            label="Gross Weight (KGS)"
            value={bookingDetails?.grossWeight || 0}
          />
        </div>
      </section>

      <CostSheetLineItemsEditor
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        incomeRows={incomeRows}
        expenseRows={expenseRows}
        editingIncomeId={editingIncomeId}
        editingExpenseId={editingExpenseId}
        onStartIncomeEdit={onStartIncomeEdit}
        onSaveIncomeEdit={onSaveIncomeEdit}
        onCancelIncomeEdit={onCancelIncomeEdit}
        onStartExpenseEdit={onStartExpenseEdit}
        onSaveExpenseEdit={onSaveExpenseEdit}
        onCancelExpenseEdit={onCancelExpenseEdit}
        updateIncomeRow={updateIncomeRow}
        updateExpenseRow={updateExpenseRow}
      />

      <section className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold">Totals Calculation</h2>
        <div className="space-y-3 rounded-lg border border-border bg-background p-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <TotalsInlineField
              label="AED Income"
              value={formatAmount(totals.aedIncome)}
            />
            <TotalsInlineField
              label="AED Expense"
              value={formatAmount(totals.aedExpense)}
            />
            <TotalsInlineField
              label="AED Profit"
              value={formatAmount(totals.aedProfit)}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <TotalsInlineField
              label="USD Income"
              value={formatAmount(totals.usdIncome)}
            />
            <TotalsInlineField
              label="USD Expense"
              value={formatAmount(totals.usdExpense)}
            />
            <TotalsInlineField
              label="USD Profit"
              value={formatAmount(totals.usdProfit)}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => submitCostSheet("Draft")}
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Save className="mr-2 size-4" />
          )}
          Save Draft
        </Button>
        <Button
          type="button"
          onClick={() => submitCostSheet("Pending Approval")}
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Send className="mr-2 size-4" />
          )}
          Create Approval
        </Button>
      </section>
    </div>
  );
}
