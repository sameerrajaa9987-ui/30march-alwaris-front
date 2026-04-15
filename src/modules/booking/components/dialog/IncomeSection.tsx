import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  SEA_CURRENCY_OPTIONS,
  SEA_SIZE_OPTIONS,
  SEA_TYPE_OPTIONS,
} from "@/modules/booking/constants/seaBooking.constants";
import type { SeaBookingIncomeDetail } from "@/modules/booking/types";
import type { Customer } from "@/modules/masters/customer/types";
import type { TariffDescription } from "@/modules/masters/tariff-description/types";
import { Field } from "@/modules/booking/components/dialog/Field";
import { IncomeRecordsTable } from "@/modules/booking/components/dialog/IncomeRecordsTable";
import type { SeaBookingIncomeDetailForm } from "@/modules/booking/components/dialog/sectionTypes";

interface IncomeSectionProps {
  incomeForm: SeaBookingIncomeDetailForm;
  incomeRows: SeaBookingIncomeDetail[];
  incomeInlineEditingId: string | null;
  incomeInlineEditDraft: SeaBookingIncomeDetail | null;
  incomeTotalInAed: number;
  customers: Customer[];
  tariffDescriptions: TariffDescription[];
  updateIncomeField: <K extends keyof SeaBookingIncomeDetailForm>(
    key: K,
    value: SeaBookingIncomeDetailForm[K],
  ) => void;
  onClearIncome: () => void;
  onAddOrUpdateIncomeRecord: () => void;
  onEditIncome: (row: SeaBookingIncomeDetail) => void;
  onCancelIncomeInlineEdit: () => void;
  onSaveIncomeInlineEdit: () => void;
  onDeleteIncome: (rowId: string) => void;
  onIncomeInlineEditField: <K extends keyof SeaBookingIncomeDetail>(
    key: K,
    value: SeaBookingIncomeDetail[K],
  ) => void;
}

export function IncomeSection({
  incomeForm,
  incomeRows,
  incomeInlineEditingId,
  incomeInlineEditDraft,
  incomeTotalInAed,
  customers,
  tariffDescriptions,
  updateIncomeField,
  onClearIncome,
  onAddOrUpdateIncomeRecord,
  onEditIncome,
  onCancelIncomeInlineEdit,
  onSaveIncomeInlineEdit,
  onDeleteIncome,
  onIncomeInlineEditField,
}: IncomeSectionProps) {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-background p-3">
      <h3 className="text-sm font-semibold">Income Details</h3>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Field label="Income Billing Party">
          <Select
            value={incomeForm.incomeBillingPartyId}
            onValueChange={(v) =>
              updateIncomeField("incomeBillingPartyId", v ?? "")
            }
          >
            <SelectTrigger className="w-full">
              <span>
                {customers.find((x) => x.id === incomeForm.incomeBillingPartyId)
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

        <Field label="Charge Description">
          <Select
            value={incomeForm.chargeDescriptionId}
            onValueChange={(v) =>
              updateIncomeField("chargeDescriptionId", v ?? "")
            }
          >
            <SelectTrigger className="w-full">
              <span>
                {tariffDescriptions.find(
                  (x) => x.id === incomeForm.chargeDescriptionId,
                )?.description ?? "Select tariff"}
              </span>
            </SelectTrigger>
            <SelectContent>
              {tariffDescriptions.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Charged Per">
          <Select
            value={incomeForm.chargedPer}
            onValueChange={(v) =>
              updateIncomeField(
                "chargedPer",
                v as SeaBookingIncomeDetailForm["chargedPer"],
              )
            }
          >
            <SelectTrigger className="w-full">
              <span>{incomeForm.chargedPer || "Select"}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DOCS">DOCS</SelectItem>
              <SelectItem value="CONT">CONT</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field label="Qty">
          <Input
            type="number"
            min={1}
            step={1}
            value={incomeForm.qty}
            onChange={(e) =>
              updateIncomeField("qty", Number(e.target.value || 0))
            }
          />
        </Field>

        <Field label="Rate">
          <Input
            type="number"
            min={0}
            step={0.01}
            value={incomeForm.rate}
            onChange={(e) =>
              updateIncomeField("rate", Number(e.target.value || 0))
            }
          />
        </Field>

        <Field label="Currency">
          <Select
            value={incomeForm.currency}
            onValueChange={(v) =>
              updateIncomeField(
                "currency",
                v as SeaBookingIncomeDetailForm["currency"],
              )
            }
          >
            <SelectTrigger className="w-full">
              <span>{incomeForm.currency || "Select currency"}</span>
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

        <Field label="Size">
          <Select
            value={incomeForm.size}
            onValueChange={(v) =>
              updateIncomeField("size", v as SeaBookingIncomeDetailForm["size"])
            }
          >
            <SelectTrigger className="w-full">
              <span>{incomeForm.size || "Select size"}</span>
            </SelectTrigger>
            <SelectContent>
              {SEA_SIZE_OPTIONS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Type">
          <Select
            value={incomeForm.type}
            onValueChange={(v) =>
              updateIncomeField("type", v as SeaBookingIncomeDetailForm["type"])
            }
          >
            <SelectTrigger className="w-full">
              <span>{incomeForm.type || "Select type"}</span>
            </SelectTrigger>
            <SelectContent>
              {SEA_TYPE_OPTIONS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Amount">
          <Input type="number" value={incomeForm.amount} readOnly />
        </Field>

        <Field label="ExRate">
          <Input
            type="number"
            min={0}
            step={0.01}
            value={incomeForm.exRate}
            onChange={(e) =>
              updateIncomeField("exRate", Number(e.target.value || 0))
            }
          />
        </Field>

        <Field label="Remarks" className="md:col-span-2">
          <Input
            value={incomeForm.remarks}
            onChange={(e) => updateIncomeField("remarks", e.target.value)}
            placeholder="Enter remarks"
          />
        </Field>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" type="button" onClick={onClearIncome}>
          Clear Income
        </Button>
        <Button type="button" onClick={onAddOrUpdateIncomeRecord}>
          Add Income Record
        </Button>
      </div>

      <IncomeRecordsTable
        incomeRows={incomeRows}
        incomeInlineEditingId={incomeInlineEditingId}
        incomeInlineEditDraft={incomeInlineEditDraft}
        incomeTotalInAed={incomeTotalInAed}
        customers={customers}
        tariffDescriptions={tariffDescriptions}
        onSaveIncomeInlineEdit={onSaveIncomeInlineEdit}
        onEditIncome={onEditIncome}
        onCancelIncomeInlineEdit={onCancelIncomeInlineEdit}
        onDeleteIncome={onDeleteIncome}
        onIncomeInlineEditField={onIncomeInlineEditField}
      />
    </div>
  );
}
