import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  SEA_CURRENCY_OPTIONS,
  SEA_EXPORT_IMPORT_OPTIONS,
  SEA_LINE_OPTIONS,
  SEA_MODE_OPTIONS,
  SEA_STATUS_OPTIONS,
} from "@/modules/booking/constants/seaBooking.constants";
import {
  SEA_BOOKING_PARTY_FIELDS,
  SEA_BOOKING_REFERENCE_FIELDS,
  type SeaBookingDialogInputField,
} from "@/modules/booking/constants/seaBookingDialog.fields";
import { Field } from "@/modules/booking/components/dialog/Field";
import type { SeaBookingFormState } from "@/modules/booking/types";
import type { Employee } from "@/modules/masters/employee/types";
import type { Customer } from "@/modules/masters/customer/types";
import type { Port } from "@/modules/masters/port/types";
import type { Terms } from "@/modules/masters/terms/types";
import type { LineOfBix } from "@/modules/masters/line-of-bix/types";

interface BookingDetailsSectionProps {
  form: SeaBookingFormState;
  employees: Employee[];
  customers: Customer[];
  ports: Port[];
  terms: Terms[];
  lineOfBix: LineOfBix[];
  updateField: <K extends keyof SeaBookingFormState>(
    key: K,
    value: SeaBookingFormState[K] | null,
  ) => void;
  renderDateField: (
    key: keyof SeaBookingFormState,
    label: string,
    className?: string,
  ) => ReactNode;
  renderInputField: (field: SeaBookingDialogInputField) => ReactNode;
}

export function BookingDetailsSection({
  form,
  employees,
  customers,
  ports,
  terms,
  lineOfBix,
  updateField,
  renderDateField,
  renderInputField,
}: BookingDetailsSectionProps) {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-background p-3">
      <h3 className="text-sm font-semibold">Booking Details</h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Field label="Job No">
          <Input value="" readOnly placeholder="System Generated" />
        </Field>

        {renderDateField("jobDate", "Job Date")}

        <Field label="Rate Agreed By">
          <Select
            value={form.rateAgreedBy}
            onValueChange={(v) => updateField("rateAgreedBy", v)}
          >
            <SelectTrigger className="w-full">
              <span
                className={form.rateAgreedBy ? "" : "text-muted-foreground"}
              >
                {employees.find((x) => x.id === form.rateAgreedBy)
                  ?.employeeName ?? "Select employee"}
              </span>
            </SelectTrigger>
            <SelectContent>
              {employees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  {employee.employeeName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Booking Party">
          <Select
            value={form.bookingParty}
            onValueChange={(v) => updateField("bookingParty", v)}
          >
            <SelectTrigger className="w-full">
              <span
                className={form.bookingParty ? "" : "text-muted-foreground"}
              >
                {customers.find((x) => x.id === form.bookingParty)
                  ?.customerName ?? "Select customer"}
              </span>
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id}>
                  {customer.customerName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Kind Attention">
          <Select
            value={form.kindAttention}
            onValueChange={(v) => updateField("kindAttention", v)}
          >
            <SelectTrigger className="w-full">
              <span
                className={form.kindAttention ? "" : "text-muted-foreground"}
              >
                {employees.find((x) => x.id === form.kindAttention)
                  ?.employeeName ?? "Select employee"}
              </span>
            </SelectTrigger>
            <SelectContent>
              {employees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  {employee.employeeName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {SEA_BOOKING_PARTY_FIELDS.map(renderInputField)}

        <Field label="Mode Of Transport">
          <Select
            value={form.modeOfTransport}
            onValueChange={(v) =>
              updateField(
                "modeOfTransport",
                v as SeaBookingFormState["modeOfTransport"],
              )
            }
          >
            <SelectTrigger className="w-full">
              <span>{form.modeOfTransport || "Select mode"}</span>
            </SelectTrigger>
            <SelectContent>
              {SEA_MODE_OPTIONS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Export / Import">
          <Select
            value={form.exportImport}
            onValueChange={(v) =>
              updateField(
                "exportImport",
                v as SeaBookingFormState["exportImport"],
              )
            }
          >
            <SelectTrigger className="w-full">
              <span>{form.exportImport || "Select option"}</span>
            </SelectTrigger>
            <SelectContent>
              {SEA_EXPORT_IMPORT_OPTIONS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Port Of Loading">
          <Select
            value={form.portOfLoading}
            onValueChange={(v) => updateField("portOfLoading", v)}
          >
            <SelectTrigger className="w-full">
              <span>
                {ports.find((x) => x.id === form.portOfLoading)?.portName ??
                  "Select port"}
              </span>
            </SelectTrigger>
            <SelectContent>
              {ports.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.portName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Port Of Destination">
          <Select
            value={form.portOfDestination}
            onValueChange={(v) => updateField("portOfDestination", v)}
          >
            <SelectTrigger className="w-full">
              <span>
                {ports.find((x) => x.id === form.portOfDestination)?.portName ??
                  "Select port"}
              </span>
            </SelectTrigger>
            <SelectContent>
              {ports.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.portName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Line">
          <Select
            value={form.line}
            onValueChange={(v) =>
              updateField("line", v as SeaBookingFormState["line"])
            }
          >
            <SelectTrigger className="w-full">
              <span>{form.line || "Select line"}</span>
            </SelectTrigger>
            <SelectContent>
              {SEA_LINE_OPTIONS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Status">
          <Select
            value={form.status}
            onValueChange={(v) =>
              updateField("status", v as SeaBookingFormState["status"])
            }
          >
            <SelectTrigger className="w-full">
              <span>{form.status || "Select status"}</span>
            </SelectTrigger>
            <SelectContent>
              {SEA_STATUS_OPTIONS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Terms">
          <Select
            value={form.terms}
            onValueChange={(v) => updateField("terms", v)}
          >
            <SelectTrigger className="w-full">
              <span>
                {terms.find((x) => x.id === form.terms)?.terms ??
                  "Select terms"}
              </span>
            </SelectTrigger>
            <SelectContent>
              {terms.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.terms}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Line Of BIX">
          <Select
            value={form.lineOfBix}
            onValueChange={(v) => updateField("lineOfBix", v)}
          >
            <SelectTrigger className="w-full">
              <span>
                {lineOfBix.find((x) => x.id === form.lineOfBix)?.lineOfBix ??
                  "Select Line of BIX"}
              </span>
            </SelectTrigger>
            <SelectContent>
              {lineOfBix.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.lineOfBix}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {SEA_BOOKING_REFERENCE_FIELDS.map(renderInputField)}

        <Field label="Default Currency">
          <Select
            value={form.currency}
            onValueChange={(v) =>
              updateField("currency", v as SeaBookingFormState["currency"])
            }
          >
            <SelectTrigger className="w-full">
              <span>{form.currency || "Select currency"}</span>
            </SelectTrigger>
            <SelectContent>
              {SEA_CURRENCY_OPTIONS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Billing Party">
          <Select
            value={form.billingParty}
            onValueChange={(v) => updateField("billingParty", v)}
          >
            <SelectTrigger className="w-full">
              <span>
                {customers.find((x) => x.id === form.billingParty)
                  ?.customerName ?? "Select customer"}
              </span>
            </SelectTrigger>
            <SelectContent>
              {customers.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.customerName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>
    </div>
  );
}
