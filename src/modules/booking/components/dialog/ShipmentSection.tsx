import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
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

function parseDateInput(value: string): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

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

      <div className="space-y-2 pt-1">
        <div className="text-xs font-medium text-muted-foreground">
          Shipment Details
        </div>
        <div className="overflow-x-auto rounded-md border border-border/70 bg-muted/10">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="text-center">Edit</TableHead>
                <TableHead className="text-center">Delete</TableHead>
                <TableHead>Container No</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Commodity</TableHead>
                <TableHead>Net Weight</TableHead>
                <TableHead>Gross Wt</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Vessel</TableHead>
                <TableHead>Voyage</TableHead>
                <TableHead>ETD</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead>HBL</TableHead>
                <TableHead>Ref No</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookingRows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={17}
                    className="text-center text-muted-foreground"
                  >
                    No shipment details added yet.
                  </TableCell>
                </TableRow>
              ) : (
                bookingRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-center">
                      {inlineEditingId === row.id ? (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={onSaveInlineEdit}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEdit(row)}
                        >
                          Edit
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {inlineEditingId === row.id ? (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={onCancelInlineEdit}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onDelete(row.id)}
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {inlineEditingId === row.id && inlineEditDraft ? (
                        <Input
                          value={inlineEditDraft.containerNo}
                          onChange={(e) =>
                            onInlineEditField("containerNo", e.target.value)
                          }
                          className="h-8 min-w-[180px]"
                          placeholder="C001, C002"
                        />
                      ) : (
                        row.containerNo || "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {inlineEditingId === row.id && inlineEditDraft ? (
                        <Input
                          type="number"
                          min={1}
                          value={inlineEditDraft.qty}
                          onChange={(e) =>
                            onInlineEditField(
                              "qty",
                              Number(e.target.value || 0),
                            )
                          }
                          className="h-8 w-20"
                        />
                      ) : (
                        row.qty
                      )}
                    </TableCell>
                    <TableCell>
                      {inlineEditingId === row.id && inlineEditDraft ? (
                        <Select
                          value={inlineEditDraft.size}
                          onValueChange={(v) =>
                            onInlineEditField(
                              "size",
                              v as SeaBookingRow["size"],
                            )
                          }
                        >
                          <SelectTrigger className="h-8 w-[90px]">
                            <span>{inlineEditDraft.size || "Size"}</span>
                          </SelectTrigger>
                          <SelectContent>
                            {SEA_SIZE_OPTIONS.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        row.size
                      )}
                    </TableCell>
                    <TableCell>
                      {inlineEditingId === row.id && inlineEditDraft ? (
                        <Select
                          value={inlineEditDraft.type}
                          onValueChange={(v) =>
                            onInlineEditField(
                              "type",
                              v as SeaBookingRow["type"],
                            )
                          }
                        >
                          <SelectTrigger className="h-8 w-[110px]">
                            <span>{inlineEditDraft.type || "Type"}</span>
                          </SelectTrigger>
                          <SelectContent>
                            {SEA_TYPE_OPTIONS.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        row.type
                      )}
                    </TableCell>
                    <TableCell>
                      {inlineEditingId === row.id && inlineEditDraft ? (
                        <Input
                          value={inlineEditDraft.commodity}
                          onChange={(e) =>
                            onInlineEditField("commodity", e.target.value)
                          }
                          className="h-8 min-w-[160px]"
                        />
                      ) : (
                        row.commodity
                      )}
                    </TableCell>
                    <TableCell>
                      {inlineEditingId === row.id && inlineEditDraft ? (
                        <Input
                          type="number"
                          min={0}
                          step={0.01}
                          value={inlineEditDraft.netWeight}
                          onChange={(e) =>
                            onInlineEditField(
                              "netWeight",
                              Number(e.target.value || 0),
                            )
                          }
                          className="h-8 w-24"
                        />
                      ) : (
                        row.netWeight
                      )}
                    </TableCell>
                    <TableCell>
                      {inlineEditingId === row.id && inlineEditDraft ? (
                        <Input
                          type="number"
                          min={0}
                          step={0.01}
                          value={inlineEditDraft.grossWeight}
                          onChange={(e) =>
                            onInlineEditField(
                              "grossWeight",
                              Number(e.target.value || 0),
                            )
                          }
                          className="h-8 w-24"
                        />
                      ) : (
                        row.grossWeight
                      )}
                    </TableCell>
                    <TableCell>
                      {inlineEditingId === row.id && inlineEditDraft ? (
                        <Input
                          type="number"
                          min={0}
                          step={0.01}
                          value={inlineEditDraft.volume}
                          onChange={(e) =>
                            onInlineEditField(
                              "volume",
                              Number(e.target.value || 0),
                            )
                          }
                          className="h-8 w-24"
                        />
                      ) : (
                        row.volume
                      )}
                    </TableCell>
                    <TableCell>
                      {inlineEditingId === row.id && inlineEditDraft ? (
                        <Select
                          value={inlineEditDraft.vessel}
                          onValueChange={(v) =>
                            onInlineEditField("vessel", v ?? "")
                          }
                        >
                          <SelectTrigger className="h-8 min-w-[160px]">
                            <span>
                              {vessels.find(
                                (x) => x.id === inlineEditDraft.vessel,
                              )?.vesselName ?? "Select vessel"}
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
                      ) : (
                        (vessels.find((x) => x.id === row.vessel)?.vesselName ??
                        "-")
                      )}
                    </TableCell>
                    <TableCell>
                      {inlineEditingId === row.id && inlineEditDraft ? (
                        <Input
                          value={inlineEditDraft.voyage}
                          onChange={(e) =>
                            onInlineEditField("voyage", e.target.value)
                          }
                          className="h-8 min-w-[140px]"
                        />
                      ) : (
                        row.voyage
                      )}
                    </TableCell>
                    <TableCell>
                      {inlineEditingId === row.id && inlineEditDraft ? (
                        <Popover
                          open={Boolean(calendarOpen[`inline-${row.id}-etd`])}
                          onOpenChange={(isOpen) =>
                            setCalendarOpen((prev) => ({
                              ...prev,
                              [`inline-${row.id}-etd`]: isOpen,
                            }))
                          }
                        >
                          <PopoverTrigger
                            render={
                              <Button
                                type="button"
                                variant="outline"
                                className="h-8 w-[130px] justify-start px-2 text-left font-normal"
                              />
                            }
                          >
                            <CalendarIcon className="mr-1.5 size-3.5 text-muted-foreground" />
                            {inlineEditDraft.etd
                              ? format(
                                  parseDateInput(inlineEditDraft.etd) ??
                                    new Date(inlineEditDraft.etd),
                                  "yyyy-MM-dd",
                                )
                              : "Select date"}
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-[240px] max-w-[calc(100vw-2rem)] p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              captionLayout="dropdown"
                              className="w-full [--cell-size:1.75rem] p-1"
                              selected={parseDateInput(inlineEditDraft.etd)}
                              onSelect={(date) => {
                                onInlineEditField(
                                  "etd",
                                  date ? format(date, "yyyy-MM-dd") : "",
                                );
                                if (date) {
                                  setCalendarOpen((prev) => ({
                                    ...prev,
                                    [`inline-${row.id}-etd`]: false,
                                  }));
                                }
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      ) : (
                        row.etd
                      )}
                    </TableCell>
                    <TableCell>
                      {inlineEditingId === row.id && inlineEditDraft ? (
                        <Popover
                          open={Boolean(calendarOpen[`inline-${row.id}-eta`])}
                          onOpenChange={(isOpen) =>
                            setCalendarOpen((prev) => ({
                              ...prev,
                              [`inline-${row.id}-eta`]: isOpen,
                            }))
                          }
                        >
                          <PopoverTrigger
                            render={
                              <Button
                                type="button"
                                variant="outline"
                                className="h-8 w-[130px] justify-start px-2 text-left font-normal"
                              />
                            }
                          >
                            <CalendarIcon className="mr-1.5 size-3.5 text-muted-foreground" />
                            {inlineEditDraft.eta
                              ? format(
                                  parseDateInput(inlineEditDraft.eta) ??
                                    new Date(inlineEditDraft.eta),
                                  "yyyy-MM-dd",
                                )
                              : "Select date"}
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-[240px] max-w-[calc(100vw-2rem)] p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              captionLayout="dropdown"
                              className="w-full [--cell-size:1.75rem] p-1"
                              selected={parseDateInput(inlineEditDraft.eta)}
                              onSelect={(date) => {
                                onInlineEditField(
                                  "eta",
                                  date ? format(date, "yyyy-MM-dd") : "",
                                );
                                if (date) {
                                  setCalendarOpen((prev) => ({
                                    ...prev,
                                    [`inline-${row.id}-eta`]: false,
                                  }));
                                }
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      ) : (
                        row.eta
                      )}
                    </TableCell>
                    <TableCell>
                      {inlineEditingId === row.id && inlineEditDraft ? (
                        <Input
                          value={inlineEditDraft.remarks}
                          onChange={(e) =>
                            onInlineEditField("remarks", e.target.value)
                          }
                          className="h-8 min-w-[160px]"
                        />
                      ) : (
                        row.remarks
                      )}
                    </TableCell>
                    <TableCell>
                      {inlineEditingId === row.id && inlineEditDraft ? (
                        <Input
                          value={inlineEditDraft.hbl}
                          onChange={(e) =>
                            onInlineEditField("hbl", e.target.value)
                          }
                          className="h-8 min-w-[140px]"
                        />
                      ) : (
                        row.hbl
                      )}
                    </TableCell>
                    <TableCell>
                      {inlineEditingId === row.id && inlineEditDraft ? (
                        <Input
                          value={inlineEditDraft.generatedReference}
                          onChange={(e) =>
                            onInlineEditField(
                              "generatedReference",
                              e.target.value,
                            )
                          }
                          className="h-8 min-w-[140px]"
                        />
                      ) : (
                        row.generatedReference
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
