import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
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
import { TableCell, TableRow } from "@/components/ui/table";
import {
  SEA_SIZE_OPTIONS,
  SEA_TYPE_OPTIONS,
} from "@/modules/booking/constants/seaBooking.constants";
import type { SeaBookingRow } from "@/modules/booking/types";
import type { Vessel } from "@/modules/masters/vessel/types";
import { EditableRecordsTable } from "@/modules/booking/components/dialog/EditableRecordsTable";

function parseDateInput(value: string): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

interface ShipmentRecordsTableProps {
  bookingRows: SeaBookingRow[];
  inlineEditingId: string | null;
  inlineEditDraft: SeaBookingRow | null;
  calendarOpen: Record<string, boolean>;
  setCalendarOpen: Dispatch<SetStateAction<Record<string, boolean>>>;
  vessels: Vessel[];
  onSaveInlineEdit: () => void;
  onEdit: (row: SeaBookingRow) => void;
  onCancelInlineEdit: () => void;
  onDelete: (rowId: string) => void;
  onInlineEditField: <K extends keyof SeaBookingRow>(
    key: K,
    value: SeaBookingRow[K],
  ) => void;
}

export function ShipmentRecordsTable({
  bookingRows,
  inlineEditingId,
  inlineEditDraft,
  calendarOpen,
  setCalendarOpen,
  vessels,
  onSaveInlineEdit,
  onEdit,
  onCancelInlineEdit,
  onDelete,
  onInlineEditField,
}: ShipmentRecordsTableProps) {
  return (
    <EditableRecordsTable
      title="Shipment Details"
      headers={[
        { label: "Edit", className: "text-center" },
        { label: "Delete", className: "text-center" },
        { label: "Container No" },
        { label: "Qty" },
        { label: "Size" },
        { label: "Type" },
        { label: "Commodity" },
        { label: "Net Weight" },
        { label: "Gross Wt" },
        { label: "Volume" },
        { label: "Vessel" },
        { label: "Voyage" },
        { label: "ETD" },
        { label: "ETA" },
        { label: "Remarks" },
        { label: "HBL" },
        { label: "Ref No" },
      ]}
      rowsCount={bookingRows.length}
      emptyText="No shipment details added yet."
      emptyColSpan={17}
    >
      {bookingRows.map((row) => (
        <TableRow key={row.id}>
          <TableCell className="text-center">
            {inlineEditingId === row.id ? (
              <Button size="sm" variant="default" onClick={onSaveInlineEdit}>
                Save
              </Button>
            ) : (
              <Button size="sm" variant="outline" onClick={() => onEdit(row)}>
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
                  onInlineEditField("qty", Number(e.target.value || 0))
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
                  onInlineEditField("size", v as SeaBookingRow["size"])
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
                  onInlineEditField("type", v as SeaBookingRow["type"])
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
                onChange={(e) => onInlineEditField("commodity", e.target.value)}
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
                  onInlineEditField("netWeight", Number(e.target.value || 0))
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
                  onInlineEditField("grossWeight", Number(e.target.value || 0))
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
                  onInlineEditField("volume", Number(e.target.value || 0))
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
                onValueChange={(v) => onInlineEditField("vessel", v ?? "")}
              >
                <SelectTrigger className="h-8 min-w-[160px]">
                  <span>
                    {vessels.find((x) => x.id === inlineEditDraft.vessel)
                      ?.vesselName ?? "Select vessel"}
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
              (vessels.find((x) => x.id === row.vessel)?.vesselName ?? "-")
            )}
          </TableCell>
          <TableCell>
            {inlineEditingId === row.id && inlineEditDraft ? (
              <Input
                value={inlineEditDraft.voyage}
                onChange={(e) => onInlineEditField("voyage", e.target.value)}
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
                onChange={(e) => onInlineEditField("remarks", e.target.value)}
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
                onChange={(e) => onInlineEditField("hbl", e.target.value)}
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
                  onInlineEditField("generatedReference", e.target.value)
                }
                className="h-8 min-w-[140px]"
              />
            ) : (
              row.generatedReference
            )}
          </TableCell>
        </TableRow>
      ))}
    </EditableRecordsTable>
  );
}
