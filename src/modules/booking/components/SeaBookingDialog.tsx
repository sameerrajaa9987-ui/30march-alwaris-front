import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ResourceDialog } from "@/modules/common/shared-crud/ResourceDialog";
import { getApiErrorMessage } from "@/shared/api/http";
import { toast } from "@/shared/lib/toast";
import { getDefaultSeaBookingForm } from "@/modules/booking/constants/seaBooking.constants";
import { type SeaBookingDialogInputField } from "@/modules/booking/constants/seaBookingDialog.fields";
import {
  useCreateBooking,
  useGenerateBookingReference,
  useUpdateBooking,
} from "@/modules/booking/hooks/useBookings";
import {
  seaBookingExpenseDetailSchema,
  seaBookingIncomeDetailSchema,
  seaBookingRowSchema,
} from "@/modules/booking/validations/seaBooking.validation";
import type {
  SeaBooking,
  SeaBookingExpenseDetail,
  SeaBookingFormState,
  SeaBookingIncomeDetail,
  SeaBookingPayload,
  SeaBookingStatus,
  SeaCurrency,
  SeaExportImport,
  SeaLine,
  SeaBookingRow,
  SeaTransportMode,
} from "@/modules/booking/types";
import type { Employee } from "@/modules/masters/employee/types";
import type { Customer } from "@/modules/masters/customer/types";
import type { Port } from "@/modules/masters/port/types";
import type { Terms } from "@/modules/masters/terms/types";
import type { LineOfBix } from "@/modules/masters/line-of-bix/types";
import type { Vessel } from "@/modules/masters/vessel/types";
import type { TariffDescription } from "@/modules/masters/tariff-description/types";
import type { VendorAgent } from "@/modules/masters/vendor-agent/types";
import { CalendarIcon } from "lucide-react";
import { BookingDetailsSection } from "@/modules/booking/components/dialog/BookingDetailsSection";
import { ExpenseSection } from "@/modules/booking/components/dialog/ExpenseSection";
import { Field } from "@/modules/booking/components/dialog/Field";
import { IncomeSection } from "@/modules/booking/components/dialog/IncomeSection";
import { ShipmentSection } from "@/modules/booking/components/dialog/ShipmentSection";
import type {
  SeaBookingExpenseDetailForm,
  SeaBookingIncomeDetailForm,
} from "@/modules/booking/components/dialog/sectionTypes";

function buildIncomePayload(items: SeaBookingIncomeDetail[]) {
  return items.map((item) => ({
    incomeBillingParty: item.incomeBillingParty,
    chargeDescription: item.chargeDescription,
    chargedPer: item.chargedPer,
    qty: item.qty,
    rate: item.rate,
    currency: item.currency,
    size: item.size,
    type: item.type,
    amount: item.amount,
    exRate: item.exRate,
    remarks: item.remarks,
  }));
}

function buildExpensePayload(items: SeaBookingExpenseDetail[]) {
  return items.map((item) => ({
    vendorName: item.vendorName,
    chargeDescription: item.chargeDescription,
    chargedPer: item.chargedPer,
    qty: item.qty,
    rate: item.rate,
    currency: item.currency,
    size: item.size,
    type: item.type,
    amount: item.amount,
    exRate: item.exRate,
    invoiceNo: item.invoiceNo,
    date: item.date,
    remarks: item.remarks,
  }));
}

interface SeaBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  value?: SeaBooking | null;
  onSuccess?: () => void;
  employees: Employee[];
  customers: Customer[];
  ports: Port[];
  terms: Terms[];
  lineOfBix: LineOfBix[];
  vessels: Vessel[];
  tariffDescriptions: TariffDescription[];
  vendorAgents: VendorAgent[];
}

function calculateAmount(qty: number, rate: number, exRate: number) {
  return Number((qty * rate * exRate).toFixed(2));
}

function getDefaultIncomeDetailForm(): SeaBookingIncomeDetailForm {
  return {
    incomeBillingParty: "",
    chargeDescription: "",
    chargedPer: "DOCS",
    qty: 1,
    rate: 0,
    currency: "USD",
    size: "20",
    type: "GP",
    amount: 0,
    exRate: 1,
    remarks: "",
  };
}

function getDefaultExpenseDetailForm(): SeaBookingExpenseDetailForm {
  const today = new Date().toISOString().split("T")[0] ?? "";

  return {
    vendorName: "",
    chargeDescription: "",
    chargedPer: "DOCS",
    qty: 1,
    rate: 0,
    currency: "USD",
    size: "20",
    type: "GP",
    amount: 0,
    exRate: 1,
    invoiceNo: "",
    date: today,
    remarks: "",
  };
}

function buildLocalRowId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toDateInput(value?: string) {
  if (!value) return "";
  return value.split("T")[0] ?? value;
}

function mapBookingToRow(
  booking: SeaBooking,
  row: NonNullable<SeaBooking["shipmentDetails"]>[number],
): SeaBookingRow {
  return {
    id: buildLocalRowId("ship"),
    jobDate: toDateInput(booking.jobDate),
    rateAgreedBy: booking.rateAgreedBy ?? "",
    bookingParty: booking.bookingParty ?? "",
    kindAttention: booking.kindAttention ?? "",
    shipper: booking.shipper,
    consignee: booking.consignee,
    modeOfTransport: booking.modeOfTransport,
    exportImport: booking.exportImport,
    portOfLoading: booking.portOfLoading ?? "",
    portOfDestination: booking.portOfDestination ?? "",
    line: booking.line ?? "",
    status: booking.status,
    terms: booking.terms ?? "",
    lineOfBix: booking.lineOfBix ?? "",
    mbl: booking.mbl,
    orderReference: booking.orderReference,
    generatedReference: row.generatedReference,
    containerNo: row.containerNo,
    qty: row.qty,
    size: row.size,
    type: row.type,
    commodity: row.commodity,
    netWeight: row.netWeight,
    grossWeight: row.grossWeight,
    volume: row.volume,
    vessel: row.vessel ?? "",
    voyage: row.voyage,
    etd: toDateInput(row.etd),
    eta: toDateInput(row.eta),
    currency: booking.defaultCurrency,
    billingParty: booking.billingParty ?? "",
    hbl: row.hbl,
    remarks: row.remarks,
  };
}

function hydrateFromBooking(booking: SeaBooking) {
  const fallbackForm = getDefaultSeaBookingForm();
  const shipmentRows =
    booking.shipmentDetails?.map((row) => mapBookingToRow(booking, row)) ?? [];
  const firstRow = shipmentRows[0];

  const form: SeaBookingFormState = firstRow
    ? { ...firstRow }
    : {
        ...fallbackForm,
        jobDate: toDateInput(booking.jobDate),
        rateAgreedBy: booking.rateAgreedBy ?? "",
        bookingParty: booking.bookingParty ?? "",
        kindAttention: booking.kindAttention ?? "",
        shipper: booking.shipper,
        consignee: booking.consignee,
        modeOfTransport: booking.modeOfTransport,
        exportImport: booking.exportImport,
        portOfLoading: booking.portOfLoading ?? "",
        portOfDestination: booking.portOfDestination ?? "",
        line: booking.line ?? "",
        status: booking.status,
        terms: booking.terms ?? "",
        lineOfBix: booking.lineOfBix ?? "",
        mbl: booking.mbl,
        orderReference: booking.orderReference,
        currency: booking.defaultCurrency as SeaBookingFormState["currency"],
        billingParty: booking.billingParty ?? "",
      };

  const incomeRows =
    booking.incomeDetails?.map((row) => ({
      ...row,
      id: buildLocalRowId("inc"),
    })) ?? [];
  const expenseRows =
    booking.expenseDetails?.map((row) => ({
      ...row,
      date: toDateInput(row.date),
      id: buildLocalRowId("exp"),
    })) ?? [];

  return {
    form,
    shipmentRows,
    incomeRows,
    expenseRows,
  };
}

function buildBookingPayloadFromForm(args: {
  form: SeaBookingFormState;
  shipmentPayload: SeaBookingPayload["shipmentDetails"];
  incomePayload: NonNullable<SeaBookingPayload["incomeDetails"]>;
  expensePayload: NonNullable<SeaBookingPayload["expenseDetails"]>;
}): SeaBookingPayload {
  const { form, shipmentPayload, incomePayload, expensePayload } = args;

  return {
    jobDate: form.jobDate,
    rateAgreedBy: form.rateAgreedBy || undefined,
    bookingParty: form.bookingParty || undefined,
    kindAttention: form.kindAttention || undefined,
    shipper: form.shipper,
    consignee: form.consignee,
    modeOfTransport: (form.modeOfTransport || "Sea") as SeaTransportMode,
    exportImport: (form.exportImport || "Export") as SeaExportImport,
    portOfLoading: form.portOfLoading || undefined,
    portOfDestination: form.portOfDestination || undefined,
    line: form.line ? (form.line as SeaLine) : undefined,
    status: (form.status || "Pending") as SeaBookingStatus,
    terms: form.terms || undefined,
    lineOfBix: form.lineOfBix || undefined,
    mbl: form.mbl,
    orderReference: form.orderReference,
    defaultCurrency: (form.currency || "USD") as SeaCurrency,
    billingParty: form.billingParty || undefined,
    shipmentDetails: shipmentPayload,
    incomeDetails: incomePayload,
    expenseDetails: expensePayload,
  };
}

export function SeaBookingDialog({
  open,
  onOpenChange,
  mode,
  value,
  onSuccess,
  employees,
  customers,
  ports,
  terms,
  lineOfBix,
  vessels,
  tariffDescriptions,
  vendorAgents,
}: SeaBookingDialogProps) {
  const createBookingMutation = useCreateBooking();
  const updateBookingMutation = useUpdateBooking();
  const generateReferenceMutation = useGenerateBookingReference();

  const initialState =
    mode === "edit" && value
      ? hydrateFromBooking(value)
      : {
          form: getDefaultSeaBookingForm(),
          shipmentRows: [] as SeaBookingRow[],
          incomeRows: [] as SeaBookingIncomeDetail[],
          expenseRows: [] as SeaBookingExpenseDetail[],
        };

  const [form, setForm] = useState<SeaBookingFormState>(
    () => initialState.form,
  );
  const [bookingRows, setBookingRows] = useState<SeaBookingRow[]>(
    () => initialState.shipmentRows,
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);
  const [inlineEditDraft, setInlineEditDraft] = useState<SeaBookingRow | null>(
    null,
  );
  const [incomeForm, setIncomeForm] = useState<SeaBookingIncomeDetailForm>(() =>
    getDefaultIncomeDetailForm(),
  );
  const [incomeRows, setIncomeRows] = useState<SeaBookingIncomeDetail[]>(
    () => initialState.incomeRows,
  );
  const [incomeInlineEditingId, setIncomeInlineEditingId] = useState<
    string | null
  >(null);
  const [incomeInlineEditDraft, setIncomeInlineEditDraft] =
    useState<SeaBookingIncomeDetail | null>(null);
  const [expenseForm, setExpenseForm] = useState<SeaBookingExpenseDetailForm>(
    () => getDefaultExpenseDetailForm(),
  );
  const [expenseRows, setExpenseRows] = useState<SeaBookingExpenseDetail[]>(
    () => initialState.expenseRows,
  );
  const [expenseInlineEditingId, setExpenseInlineEditingId] = useState<
    string | null
  >(null);
  const [expenseInlineEditDraft, setExpenseInlineEditDraft] =
    useState<SeaBookingExpenseDetail | null>(null);
  const [calendarOpen, setCalendarOpen] = useState<Record<string, boolean>>({});

  function updateField<K extends keyof SeaBookingFormState>(
    key: K,
    value: SeaBookingFormState[K] | null,
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: (value === null ? "" : value) as SeaBookingFormState[K],
    }));
  }

  async function createNextReference() {
    try {
      const nextReference = await generateReferenceMutation.mutateAsync();
      updateField("generatedReference", nextReference);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  function resetForm() {
    setForm(getDefaultSeaBookingForm());
    setEditingId(null);
  }

  function onAddOrUpdateRecord() {
    const parsed = seaBookingRowSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ?? "Please check required fields",
      );
      return;
    }

    const recordId = editingId || buildLocalRowId("ship");

    const newRow: SeaBookingRow = {
      ...parsed.data,
      id: recordId,
    };

    setBookingRows((prev) =>
      editingId
        ? prev.map((x) => (x.id === editingId ? newRow : x))
        : [...prev, newRow],
    );

    setForm((prev) => ({
      ...prev,
      generatedReference: "",
      containerNo: "",
      qty: 0,
      size: "",
      type: "",
      commodity: "",
      vessel: "",
      etd: "",
      eta: "",
    }));

    setEditingId(null);
  }

  function onEdit(row: SeaBookingRow) {
    setInlineEditingId(row.id);
    setInlineEditDraft({ ...row });
  }

  function onInlineEditField<K extends keyof SeaBookingRow>(
    key: K,
    value: SeaBookingRow[K],
  ) {
    setInlineEditDraft((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function onCancelInlineEdit() {
    setInlineEditingId(null);
    setInlineEditDraft(null);
  }

  function onSaveInlineEdit() {
    if (!inlineEditDraft || !inlineEditingId) return;

    const parsed = seaBookingRowSchema.safeParse(inlineEditDraft);
    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ?? "Please check required fields",
      );
      return;
    }

    setBookingRows((prev) =>
      prev.map((row) =>
        row.id === inlineEditingId
          ? {
              ...parsed.data,
              id: inlineEditingId,
            }
          : row,
      ),
    );
    setInlineEditingId(null);
    setInlineEditDraft(null);
  }

  function onDelete(rowId: string) {
    if (rowId === inlineEditingId) {
      setInlineEditingId(null);
      setInlineEditDraft(null);
    }
    setBookingRows((prev) => prev.filter((row) => row.id !== rowId));
  }

  function updateIncomeField<K extends keyof SeaBookingIncomeDetailForm>(
    key: K,
    value: SeaBookingIncomeDetailForm[K],
  ) {
    setIncomeForm((prev) => {
      const next = {
        ...prev,
        [key]: value,
      };

      if (key === "qty" || key === "rate" || key === "exRate") {
        next.amount = calculateAmount(next.qty, next.rate, next.exRate);
      }

      return next;
    });
  }

  function onAddOrUpdateIncomeRecord() {
    const parsed = seaBookingIncomeDetailSchema.safeParse(incomeForm);
    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ?? "Please check income details",
      );
      return;
    }

    const rowId = buildLocalRowId("inc");
    setIncomeRows((prev) => [...prev, { ...parsed.data, id: rowId }]);
    setIncomeForm(getDefaultIncomeDetailForm());
  }

  function onEditIncome(row: SeaBookingIncomeDetail) {
    setIncomeInlineEditingId(row.id);
    setIncomeInlineEditDraft({ ...row });
  }

  function onIncomeInlineEditField<K extends keyof SeaBookingIncomeDetail>(
    key: K,
    value: SeaBookingIncomeDetail[K],
  ) {
    setIncomeInlineEditDraft((prev) => {
      if (!prev) return prev;
      const next = {
        ...prev,
        [key]: value,
      };

      if (key === "qty" || key === "rate" || key === "exRate") {
        next.amount = calculateAmount(next.qty, next.rate, next.exRate);
      }

      return next;
    });
  }

  function onCancelIncomeInlineEdit() {
    setIncomeInlineEditingId(null);
    setIncomeInlineEditDraft(null);
  }

  function onSaveIncomeInlineEdit() {
    if (!incomeInlineEditDraft || !incomeInlineEditingId) return;
    const parsed = seaBookingIncomeDetailSchema.safeParse(
      incomeInlineEditDraft,
    );
    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ?? "Please check income details",
      );
      return;
    }

    setIncomeRows((prev) =>
      prev.map((row) =>
        row.id === incomeInlineEditingId
          ? {
              ...parsed.data,
              id: incomeInlineEditingId,
            }
          : row,
      ),
    );
    setIncomeInlineEditingId(null);
    setIncomeInlineEditDraft(null);
  }

  function onDeleteIncome(rowId: string) {
    if (rowId === incomeInlineEditingId) {
      setIncomeInlineEditingId(null);
      setIncomeInlineEditDraft(null);
    }
    setIncomeRows((prev) => prev.filter((row) => row.id !== rowId));
  }

  function updateExpenseField<K extends keyof SeaBookingExpenseDetailForm>(
    key: K,
    value: SeaBookingExpenseDetailForm[K],
  ) {
    setExpenseForm((prev) => {
      const next = {
        ...prev,
        [key]: value,
      };

      if (key === "qty" || key === "rate" || key === "exRate") {
        next.amount = calculateAmount(next.qty, next.rate, next.exRate);
      }

      return next;
    });
  }

  function onAddOrUpdateExpenseRecord() {
    const parsed = seaBookingExpenseDetailSchema.safeParse(expenseForm);
    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ?? "Please check expense details",
      );
      return;
    }

    const rowId = buildLocalRowId("exp");
    setExpenseRows((prev) => [...prev, { ...parsed.data, id: rowId }]);
    setExpenseForm(getDefaultExpenseDetailForm());
  }

  function onEditExpense(row: SeaBookingExpenseDetail) {
    setExpenseInlineEditingId(row.id);
    setExpenseInlineEditDraft({ ...row });
  }

  function onExpenseInlineEditField<K extends keyof SeaBookingExpenseDetail>(
    key: K,
    value: SeaBookingExpenseDetail[K],
  ) {
    setExpenseInlineEditDraft((prev) => {
      if (!prev) return prev;
      const next = {
        ...prev,
        [key]: value,
      };

      if (key === "qty" || key === "rate" || key === "exRate") {
        next.amount = calculateAmount(next.qty, next.rate, next.exRate);
      }

      return next;
    });
  }

  function onCancelExpenseInlineEdit() {
    setExpenseInlineEditingId(null);
    setExpenseInlineEditDraft(null);
  }

  function onSaveExpenseInlineEdit() {
    if (!expenseInlineEditDraft || !expenseInlineEditingId) return;
    const parsed = seaBookingExpenseDetailSchema.safeParse(
      expenseInlineEditDraft,
    );
    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ?? "Please check expense details",
      );
      return;
    }

    setExpenseRows((prev) =>
      prev.map((row) =>
        row.id === expenseInlineEditingId
          ? {
              ...parsed.data,
              id: expenseInlineEditingId,
            }
          : row,
      ),
    );
    setExpenseInlineEditingId(null);
    setExpenseInlineEditDraft(null);
  }

  function onDeleteExpense(rowId: string) {
    if (rowId === expenseInlineEditingId) {
      setExpenseInlineEditingId(null);
      setExpenseInlineEditDraft(null);
    }
    setExpenseRows((prev) => prev.filter((row) => row.id !== rowId));
  }

  function renderInputField(field: SeaBookingDialogInputField) {
    if (field.type === "date") {
      return renderDateField(field.key, field.label, field.className);
    }

    const numericValue = Number(form[field.key] ?? 0);
    const value =
      field.type === "number"
        ? field.key === "qty" && numericValue === 0
          ? ""
          : numericValue
        : String(form[field.key] ?? "");

    return (
      <Field
        key={String(field.key)}
        label={field.label}
        className={field.className}
      >
        <Input
          type={field.type ?? "text"}
          min={field.min}
          step={field.step}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => {
            const nextValue =
              field.type === "number"
                ? Number(e.target.value || 0)
                : e.target.value;
            updateField(
              field.key,
              nextValue as SeaBookingFormState[typeof field.key],
            );
          }}
        />
      </Field>
    );
  }

  function parseDateInput(value: string): Date | undefined {
    if (!value) return undefined;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }

  function renderDateField(
    key: keyof SeaBookingFormState,
    label: string,
    className?: string,
  ) {
    const calendarKey = String(key);
    const dateValue = String(form[key] ?? "");
    const selectedDate = parseDateInput(dateValue);

    return (
      <Field key={String(key)} label={label} className={className}>
        <Popover
          open={Boolean(calendarOpen[calendarKey])}
          onOpenChange={(isOpen) =>
            setCalendarOpen((prev) => ({
              ...prev,
              [calendarKey]: isOpen,
            }))
          }
        >
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="outline"
                className="h-8 w-full justify-start text-left font-normal"
              />
            }
          >
            <CalendarIcon className="mr-2 size-4 text-muted-foreground" />
            {selectedDate ? format(selectedDate, "dd-MM-yyyy") : "Select date"}
          </PopoverTrigger>
          <PopoverContent
            className="w-[240px] max-w-[calc(100vw-2rem)] p-0"
            align="start"
          >
            <Calendar
              mode="single"
              captionLayout="dropdown"
              className="w-full [--cell-size:1.75rem] p-1"
              selected={selectedDate}
              onSelect={(date) => {
                updateField(
                  key,
                  (date
                    ? format(date, "yyyy-MM-dd")
                    : "") as SeaBookingFormState[typeof key],
                );
                if (date) {
                  setCalendarOpen((prev) => ({
                    ...prev,
                    [calendarKey]: false,
                  }));
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
    );
  }

  const shipmentPayload = useMemo(
    () =>
      bookingRows.map((row) => ({
        generatedReference: row.generatedReference,
        containerNo: row.containerNo,
        qty: row.qty,
        size: (row.size || "20") as "20" | "40" | "45",
        type: (row.type || "GP") as
          | "DC"
          | "DV"
          | "FR"
          | "GP"
          | "GV"
          | "HC"
          | "HD"
          | "HQ"
          | "ISO"
          | "OT"
          | "RF"
          | "SD"
          | "SR",
        commodity: row.commodity,
        netWeight: row.netWeight,
        grossWeight: row.grossWeight,
        volume: row.volume,
        vessel: row.vessel || undefined,
        voyage: row.voyage,
        etd: row.etd,
        eta: row.eta,
        hbl: row.hbl,
        remarks: row.remarks,
      })),
    [bookingRows],
  );

  const incomePayload = useMemo(
    () => buildIncomePayload(incomeRows),
    [incomeRows],
  );
  const expensePayload = useMemo(
    () => buildExpensePayload(expenseRows),
    [expenseRows],
  );
  const incomeTotalInAed = useMemo(
    () => incomeRows.reduce((sum, row) => sum + Number(row.amount || 0), 0),
    [incomeRows],
  );
  const expenseTotalInAed = useMemo(
    () => expenseRows.reduce((sum, row) => sum + Number(row.amount || 0), 0),
    [expenseRows],
  );
  const netAmountInAed = useMemo(
    () => incomeTotalInAed - expenseTotalInAed,
    [incomeTotalInAed, expenseTotalInAed],
  );
  const isSubmitting =
    createBookingMutation.isPending || updateBookingMutation.isPending;

  async function onSubmit() {
    if (bookingRows.length === 0) {
      toast.error("Add at least one shipment detail before saving booking.");
      return;
    }

    try {
      const bookingPayload = buildBookingPayloadFromForm({
        form,
        shipmentPayload,
        incomePayload,
        expensePayload,
      });

      if (mode === "edit") {
        if (!value?.id) {
          toast.error("Booking id is missing for update.");
          return;
        }

        await updateBookingMutation.mutateAsync({
          id: value.id,
          payload: bookingPayload,
        });
        toast.success("Sea booking updated successfully");
      } else {
        await createBookingMutation.mutateAsync(bookingPayload);
        toast.success("Sea booking created successfully");
      }

      onSuccess?.();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      throw error;
    }
  }

  return (
    <ResourceDialog<SeaBooking, SeaBookingPayload, never>
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      value={value ?? null}
      onSuccess={onSuccess}
      createTitle="Add Sea Booking"
      editTitle="Edit Sea Booking"
      dialogContentClassName="max-h-[92vh] w-[calc(100vw-2rem)] sm:w-[1200px] sm:max-w-[1200px] overflow-y-auto"
      customSubmit={onSubmit}
      customIsPending={isSubmitting}
      customDisableSubmit={isSubmitting || bookingRows.length === 0}
      submitLabelCreate="Create Sea Booking"
      submitLabelEdit="Save Changes"
      renderBody={() => (
        <div className="space-y-4 py-2">
          <BookingDetailsSection
            form={form}
            employees={employees}
            customers={customers}
            ports={ports}
            terms={terms}
            lineOfBix={lineOfBix}
            updateField={updateField}
            renderDateField={renderDateField}
            renderInputField={renderInputField}
          />

          <ShipmentSection
            form={form}
            vessels={vessels}
            bookingRows={bookingRows}
            editingId={editingId}
            inlineEditingId={inlineEditingId}
            inlineEditDraft={inlineEditDraft}
            calendarOpen={calendarOpen}
            isGeneratingReference={generateReferenceMutation.isPending}
            setCalendarOpen={setCalendarOpen}
            updateField={updateField}
            renderInputField={renderInputField}
            createNextReference={createNextReference}
            resetForm={resetForm}
            onAddOrUpdateRecord={onAddOrUpdateRecord}
            onEdit={onEdit}
            onCancelInlineEdit={onCancelInlineEdit}
            onSaveInlineEdit={onSaveInlineEdit}
            onDelete={onDelete}
            onInlineEditField={onInlineEditField}
          />

          <IncomeSection
            incomeForm={incomeForm}
            incomeRows={incomeRows}
            incomeInlineEditingId={incomeInlineEditingId}
            incomeInlineEditDraft={incomeInlineEditDraft}
            incomeTotalInAed={incomeTotalInAed}
            customers={customers}
            tariffDescriptions={tariffDescriptions}
            updateIncomeField={updateIncomeField}
            onClearIncome={() => setIncomeForm(getDefaultIncomeDetailForm())}
            onAddOrUpdateIncomeRecord={onAddOrUpdateIncomeRecord}
            onEditIncome={onEditIncome}
            onCancelIncomeInlineEdit={onCancelIncomeInlineEdit}
            onSaveIncomeInlineEdit={onSaveIncomeInlineEdit}
            onDeleteIncome={onDeleteIncome}
            onIncomeInlineEditField={onIncomeInlineEditField}
          />

          <ExpenseSection
            expenseForm={expenseForm}
            expenseRows={expenseRows}
            expenseInlineEditingId={expenseInlineEditingId}
            expenseInlineEditDraft={expenseInlineEditDraft}
            expenseTotalInAed={expenseTotalInAed}
            vendorAgents={vendorAgents}
            tariffDescriptions={tariffDescriptions}
            updateExpenseField={updateExpenseField}
            onClearExpense={() => setExpenseForm(getDefaultExpenseDetailForm())}
            onAddOrUpdateExpenseRecord={onAddOrUpdateExpenseRecord}
            onEditExpense={onEditExpense}
            onCancelExpenseInlineEdit={onCancelExpenseInlineEdit}
            onSaveExpenseInlineEdit={onSaveExpenseInlineEdit}
            onDeleteExpense={onDeleteExpense}
            onExpenseInlineEditField={onExpenseInlineEditField}
          />

          <div className="rounded-lg border border-border bg-background p-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <Field label="Total Income In AED">
                <Input value={incomeTotalInAed.toFixed(2)} readOnly />
              </Field>
              <Field label="Total Expense In AED">
                <Input value={expenseTotalInAed.toFixed(2)} readOnly />
              </Field>
              <Field label="Net Amount In AED">
                <Input value={netAmountInAed.toFixed(2)} readOnly />
              </Field>
            </div>
          </div>
        </div>
      )}
    />
  );
}
