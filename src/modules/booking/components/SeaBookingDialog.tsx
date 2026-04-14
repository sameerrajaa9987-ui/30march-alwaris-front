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
import { type SeaBookingDialogInputField } from "@/modules/booking/constants/seaBookingDialog.fields";
import type {
  SeaBooking,
  SeaBookingFormState,
  SeaBookingPayload,
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
import {
  useSeaBookingForm,
  getDefaultIncomeDetailForm,
  getDefaultExpenseDetailForm,
} from "@/modules/booking/hooks/useSeaBookingForm";

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

export function SeaBookingDialog(props: SeaBookingDialogProps) {
  const {
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
  } = props;

  const { state, actions } = useSeaBookingForm({ mode, value, onSuccess });

  function parseDateInput(val: string): Date | undefined {
    if (!val) return undefined;
    const parsed = new Date(val);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }

  function renderDateField(
    key: keyof SeaBookingFormState,
    label: string,
    className?: string,
  ) {
    const calendarKey = String(key);
    const selectedDate = parseDateInput(String(state.form[key] ?? ""));

    return (
      <Field key={String(key)} label={label} className={className}>
        <Popover
          open={Boolean(state.calendarOpen[calendarKey])}
          onOpenChange={(isOpen) =>
            actions.setCalendarOpen((p) => ({ ...p, [calendarKey]: isOpen }))
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
                actions.updateField(
                  key,
                  (date
                    ? format(date, "yyyy-MM-dd")
                    : "") as SeaBookingFormState[typeof key],
                );
                if (date)
                  actions.setCalendarOpen((p) => ({
                    ...p,
                    [calendarKey]: false,
                  }));
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
    );
  }

  function renderInputField(field: SeaBookingDialogInputField) {
    if (field.type === "date")
      return renderDateField(field.key, field.label, field.className);

    const numericValue = Number(state.form[field.key] ?? 0);
    const fieldValue =
      field.type === "number"
        ? field.key === "qty" && numericValue === 0
          ? ""
          : numericValue
        : String(state.form[field.key] ?? "");

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
          value={fieldValue}
          onChange={(e) => {
            const nextValue =
              field.type === "number"
                ? Number(e.target.value || 0)
                : e.target.value;
            actions.updateField(
              field.key,
              nextValue as SeaBookingFormState[typeof field.key],
            );
          }}
        />
      </Field>
    );
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
      customSubmit={actions.onSubmit}
      customIsPending={state.isSubmitting}
      customDisableSubmit={state.isSubmitting || state.bookingRows.length === 0}
      submitLabelCreate="Create Sea Booking"
      submitLabelEdit="Save Changes"
      renderBody={() => (
        <div className="space-y-4 py-2">
          <BookingDetailsSection
            form={state.form}
            employees={employees}
            customers={customers}
            ports={ports}
            terms={terms}
            lineOfBix={lineOfBix}
            updateField={actions.updateField}
            renderDateField={renderDateField}
            renderInputField={renderInputField}
          />

          <ShipmentSection
            form={state.form}
            vessels={vessels}
            bookingRows={state.bookingRows}
            editingId={state.editingId}
            inlineEditingId={state.inlineEditingId}
            inlineEditDraft={state.inlineEditDraft}
            calendarOpen={state.calendarOpen}
            isGeneratingReference={state.isGeneratingReference}
            setCalendarOpen={actions.setCalendarOpen}
            updateField={actions.updateField}
            renderInputField={renderInputField}
            createNextReference={actions.createNextReference}
            resetForm={actions.resetForm}
            onAddOrUpdateRecord={actions.onAddOrUpdateRecord}
            onEdit={actions.onEdit}
            onCancelInlineEdit={actions.onCancelInlineEdit}
            onSaveInlineEdit={actions.onSaveInlineEdit}
            onDelete={actions.onDelete}
            onInlineEditField={actions.onInlineEditField}
          />

          <IncomeSection
            incomeForm={state.incomeForm}
            incomeRows={state.incomeRows}
            incomeInlineEditingId={state.incomeInlineEditingId}
            incomeInlineEditDraft={state.incomeInlineEditDraft}
            incomeTotalInAed={state.incomeTotalInAed}
            customers={customers}
            tariffDescriptions={tariffDescriptions}
            updateIncomeField={actions.updateIncomeField}
            onClearIncome={() =>
              actions.setIncomeForm(getDefaultIncomeDetailForm())
            }
            onAddOrUpdateIncomeRecord={actions.onAddOrUpdateIncomeRecord}
            onEditIncome={actions.onEditIncome}
            onCancelIncomeInlineEdit={actions.onCancelIncomeInlineEdit}
            onSaveIncomeInlineEdit={actions.onSaveIncomeInlineEdit}
            onDeleteIncome={actions.onDeleteIncome}
            onIncomeInlineEditField={actions.onIncomeInlineEditField}
          />

          <ExpenseSection
            expenseForm={state.expenseForm}
            expenseRows={state.expenseRows}
            expenseInlineEditingId={state.expenseInlineEditingId}
            expenseInlineEditDraft={state.expenseInlineEditDraft}
            expenseTotalInAed={state.expenseTotalInAed}
            vendorAgents={vendorAgents}
            tariffDescriptions={tariffDescriptions}
            updateExpenseField={actions.updateExpenseField}
            onClearExpense={() =>
              actions.setExpenseForm(getDefaultExpenseDetailForm())
            }
            onAddOrUpdateExpenseRecord={actions.onAddOrUpdateExpenseRecord}
            onEditExpense={actions.onEditExpense}
            onCancelExpenseInlineEdit={actions.onCancelExpenseInlineEdit}
            onSaveExpenseInlineEdit={actions.onSaveExpenseInlineEdit}
            onDeleteExpense={actions.onDeleteExpense}
            onExpenseInlineEditField={actions.onExpenseInlineEditField}
          />

          <div className="rounded-lg border border-border bg-background p-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <Field label="Total Income In AED">
                <Input value={state.incomeTotalInAed.toFixed(2)} readOnly />
              </Field>
              <Field label="Total Expense In AED">
                <Input value={state.expenseTotalInAed.toFixed(2)} readOnly />
              </Field>
              <Field label="Net Amount In AED">
                <Input value={state.netAmountInAed.toFixed(2)} readOnly />
              </Field>
            </div>
          </div>
        </div>
      )}
    />
  );
}
