import { useState, useMemo } from "react";
import { toast } from "@/shared/lib/toast";
import { getApiErrorMessage } from "@/shared/api/http";
import { getDefaultSeaBookingForm } from "@/modules/booking/constants/seaBooking.constants";
import {
  seaBookingExpenseDetailSchema,
  seaBookingIncomeDetailSchema,
  seaBookingRowSchema,
} from "@/modules/booking/validations/seaBooking.validation";
import {
  useCreateBooking,
  useGenerateBookingReference,
  useUpdateBooking,
} from "@/modules/booking/hooks/useBookings";
import type {
  SeaBooking,
  SeaBookingExpenseDetail,
  SeaBookingFormState,
  SeaBookingIncomeDetail,
  SeaBookingPayload,
  SeaBookingRow,
  SeaTransportMode,
  SeaExportImport,
  SeaLine,
  SeaBookingStatus,
  SeaCurrency,
} from "@/modules/booking/types";
import type {
  SeaBookingExpenseDetailForm,
  SeaBookingIncomeDetailForm,
} from "@/modules/booking/components/dialog/sectionTypes";

function buildIncomePayload(items: SeaBookingIncomeDetail[]) {
  return items.map((item) => ({
    incomeBillingPartyId: item.incomeBillingPartyId,
    chargeDescriptionId: item.chargeDescriptionId,
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
    vendorId: item.vendorId,
    chargeDescriptionId: item.chargeDescriptionId,
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

function calculateAmount(qty: number, rate: number, exRate: number) {
  return Number((qty * rate * exRate).toFixed(2));
}

export function getDefaultIncomeDetailForm(): SeaBookingIncomeDetailForm {
  return {
    incomeBillingPartyId: "",
    chargeDescriptionId: "",
    chargedPer: "DOCS",
    qty: 1,
    rate: 0,
    currency: "AED",
    size: "20",
    type: "GP",
    amount: 0,
    exRate: 1,
    remarks: "",
  };
}

export function getDefaultExpenseDetailForm(): SeaBookingExpenseDetailForm {
  const today = new Date().toISOString().split("T")[0] ?? "";
  return {
    vendorId: "",
    chargeDescriptionId: "",
    chargedPer: "DOCS",
    qty: 1,
    rate: 0,
    currency: "AED",
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

  return { form, shipmentRows, incomeRows, expenseRows };
}

export function buildBookingPayloadFromForm(args: {
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
    defaultCurrency: (form.currency || "AED") as SeaCurrency,
    billingParty: form.billingParty || undefined,
    shipmentDetails: shipmentPayload,
    incomeDetails: incomePayload,
    expenseDetails: expensePayload,
  };
}

export function useSeaBookingForm({
  mode,
  value,
  onSuccess,
}: {
  mode: "create" | "edit";
  value?: SeaBooking | null;
  onSuccess?: () => void;
}) {
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
    val: SeaBookingFormState[K] | null,
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: (val === null ? "" : val) as SeaBookingFormState[K],
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
    const newRow: SeaBookingRow = { ...parsed.data, id: recordId };

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
    val: SeaBookingRow[K],
  ) {
    setInlineEditDraft((prev) => (prev ? { ...prev, [key]: val } : prev));
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
          ? { ...parsed.data, id: inlineEditingId }
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
    val: SeaBookingIncomeDetailForm[K],
  ) {
    setIncomeForm((prev) => {
      const next = { ...prev, [key]: val };
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
    setIncomeRows((prev) => [
      ...prev,
      { ...parsed.data, id: buildLocalRowId("inc") },
    ]);
    setIncomeForm(getDefaultIncomeDetailForm());
  }

  function onEditIncome(row: SeaBookingIncomeDetail) {
    setIncomeInlineEditingId(row.id);
    setIncomeInlineEditDraft({ ...row });
  }

  function onIncomeInlineEditField<K extends keyof SeaBookingIncomeDetail>(
    key: K,
    val: SeaBookingIncomeDetail[K],
  ) {
    setIncomeInlineEditDraft((prev) => {
      if (!prev) return prev;
      const next = { ...prev, [key]: val };
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
      prev.map((r) =>
        r.id === incomeInlineEditingId
          ? { ...parsed.data, id: incomeInlineEditingId }
          : r,
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
    setIncomeRows((prev) => prev.filter((r) => r.id !== rowId));
  }

  function updateExpenseField<K extends keyof SeaBookingExpenseDetailForm>(
    key: K,
    val: SeaBookingExpenseDetailForm[K],
  ) {
    setExpenseForm((prev) => {
      const next = { ...prev, [key]: val };
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
    setExpenseRows((prev) => [
      ...prev,
      { ...parsed.data, id: buildLocalRowId("exp") },
    ]);
    setExpenseForm(getDefaultExpenseDetailForm());
  }

  function onEditExpense(row: SeaBookingExpenseDetail) {
    setExpenseInlineEditingId(row.id);
    setExpenseInlineEditDraft({ ...row });
  }

  function onExpenseInlineEditField<K extends keyof SeaBookingExpenseDetail>(
    key: K,
    val: SeaBookingExpenseDetail[K],
  ) {
    setExpenseInlineEditDraft((prev) => {
      if (!prev) return prev;
      const next = { ...prev, [key]: val };
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
      prev.map((r) =>
        r.id === expenseInlineEditingId
          ? { ...parsed.data, id: expenseInlineEditingId }
          : r,
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
    setExpenseRows((prev) => prev.filter((r) => r.id !== rowId));
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
    () => incomeRows.reduce((s, r) => s + Number(r.amount || 0), 0),
    [incomeRows],
  );
  const expenseTotalInAed = useMemo(
    () => expenseRows.reduce((s, r) => s + Number(r.amount || 0), 0),
    [expenseRows],
  );
  const netAmountInAed = useMemo(
    () => incomeTotalInAed - expenseTotalInAed,
    [incomeTotalInAed, expenseTotalInAed],
  );

  const isGeneratingReference = generateReferenceMutation.isPending;
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

  return {
    state: {
      form,
      bookingRows,
      editingId,
      inlineEditingId,
      inlineEditDraft,
      incomeForm,
      incomeRows,
      incomeInlineEditingId,
      incomeInlineEditDraft,
      incomeTotalInAed,
      expenseForm,
      expenseRows,
      expenseInlineEditingId,
      expenseInlineEditDraft,
      expenseTotalInAed,
      calendarOpen,
      netAmountInAed,
      isGeneratingReference,
      isSubmitting,
    },
    actions: {
      setCalendarOpen,
      updateField,
      createNextReference,
      resetForm,
      onAddOrUpdateRecord,
      onEdit,
      onInlineEditField,
      onCancelInlineEdit,
      onSaveInlineEdit,
      onDelete,
      updateIncomeField,
      onAddOrUpdateIncomeRecord,
      onEditIncome,
      onIncomeInlineEditField,
      onCancelIncomeInlineEdit,
      onSaveIncomeInlineEdit,
      onDeleteIncome,
      updateExpenseField,
      onAddOrUpdateExpenseRecord,
      onEditExpense,
      onExpenseInlineEditField,
      onCancelExpenseInlineEdit,
      onSaveExpenseInlineEdit,
      onDeleteExpense,
      onSubmit,
      setIncomeForm,
      setExpenseForm,
    },
  };
}
