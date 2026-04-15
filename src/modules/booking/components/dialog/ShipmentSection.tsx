import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  SEA_BOOKING_COMMODITY_FIELD,
  SEA_BOOKING_CONTAINER_NO_FIELD,
  SEA_BOOKING_HBL_FIELD,
  SEA_BOOKING_QTY_FIELD,
  SEA_BOOKING_SCHEDULE_FIELDS,
  SEA_BOOKING_WEIGHT_FIELDS,
  type SeaBookingDialogInputField,
} from "@/modules/booking/constants/seaBookingDialog.fields";
import {
  SEA_SIZE_OPTIONS,
  SEA_TYPE_OPTIONS,
} from "@/modules/booking/constants/seaBooking.constants";
import type {
  SeaBookingFormState,
  SeaBookingRow,
} from "@/modules/booking/types";
import type { Vessel } from "@/modules/masters/vessel/types";
import { Field } from "@/modules/booking/components/dialog/Field";
import { ShipmentRecordsTable } from "@/modules/booking/components/dialog/ShipmentRecordsTable";

interface ShipmentSectionProps {
  form: SeaBookingFormState;
  vessels: Vessel[];
  bookingRows: SeaBookingRow[];
  editingId: string | null;
  inlineEditingId: string | null;
  inlineEditDraft: SeaBookingRow | null;
  calendarOpen: Record<string, boolean>;
  isGeneratingReference: boolean;
  setCalendarOpen: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  updateField: <K extends keyof SeaBookingFormState>(
    key: K,
    value: SeaBookingFormState[K] | null,
  ) => void;
  renderInputField: (field: SeaBookingDialogInputField) => React.ReactNode;
  createNextReference: () => Promise<void>;
  resetForm: () => void;
  onAddOrUpdateRecord: () => void;
  onEdit: (row: SeaBookingRow) => void;
  onCancelInlineEdit: () => void;
  onSaveInlineEdit: () => void;
  onDelete: (rowId: string) => void;
  onInlineEditField: <K extends keyof SeaBookingRow>(
    key: K,
    value: SeaBookingRow[K],
  ) => void;
}

export function ShipmentSection({
  form,
  vessels,
  bookingRows,
  editingId,
  inlineEditingId,
  inlineEditDraft,
  calendarOpen,
  isGeneratingReference,
  setCalendarOpen,
  updateField,
  renderInputField,
  createNextReference,
  resetForm,
  onAddOrUpdateRecord,
  onEdit,
  onCancelInlineEdit,
  onSaveInlineEdit,
  onDelete,
  onInlineEditField,
}: ShipmentSectionProps) {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-background p-3">
      <h3 className="text-sm font-semibold">Shipment Details</h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Field label="Generate Reference" className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Input
              value={form.generatedReference}
              readOnly
              placeholder="REF-0001"
            />
            <Button
              onClick={createNextReference}
              size="sm"
              type="button"
              disabled={isGeneratingReference}
            >
              {isGeneratingReference ? "Generating..." : "Generate"}
            </Button>
          </div>
        </Field>

        {renderInputField(SEA_BOOKING_CONTAINER_NO_FIELD)}
        {renderInputField(SEA_BOOKING_QTY_FIELD)}

        <Field label="Size">
          <Select
            value={form.size}
            onValueChange={(v) =>
              updateField("size", v as SeaBookingFormState["size"])
            }
          >
            <SelectTrigger className="w-full">
              <span>{form.size || "Select size"}</span>
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
            value={form.type}
            onValueChange={(v) =>
              updateField("type", v as SeaBookingFormState["type"])
            }
          >
            <SelectTrigger className="w-full">
              <span>{form.type || "Select type"}</span>
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

        {renderInputField(SEA_BOOKING_COMMODITY_FIELD)}
        {SEA_BOOKING_WEIGHT_FIELDS.map(renderInputField)}

        <Field label="Vessel">
          <Select
            value={form.vessel}
            onValueChange={(v) => updateField("vessel", v)}
          >
            <SelectTrigger className="w-full">
              <span>
                {vessels.find((x) => x.id === form.vessel)?.vesselName ??
                  "Select vessel"}
              </span>
            </SelectTrigger>
            <SelectContent>
              {vessels.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.vesselName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {SEA_BOOKING_SCHEDULE_FIELDS.map(renderInputField)}
        {renderInputField(SEA_BOOKING_HBL_FIELD)}

        <Field label="Remarks" className="md:col-span-4">
          <textarea
            value={form.remarks}
            onChange={(e) => updateField("remarks", e.target.value)}
            className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
            placeholder="Enter Remarks"
            rows={3}
          />
        </Field>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" onClick={resetForm} type="button">
          Clear
        </Button>
        <Button onClick={onAddOrUpdateRecord} type="button">
          {editingId ? "Update Record" : "Add Record"}
        </Button>
      </div>

      <ShipmentRecordsTable
        bookingRows={bookingRows}
        inlineEditingId={inlineEditingId}
        inlineEditDraft={inlineEditDraft}
        calendarOpen={calendarOpen}
        setCalendarOpen={setCalendarOpen}
        vessels={vessels}
        onSaveInlineEdit={onSaveInlineEdit}
        onEdit={onEdit}
        onCancelInlineEdit={onCancelInlineEdit}
        onDelete={onDelete}
        onInlineEditField={onInlineEditField}
      />
    </div>
  );
}
