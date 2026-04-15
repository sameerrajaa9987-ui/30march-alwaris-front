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
  SEA_CURRENCY_OPTIONS,
  SEA_SIZE_OPTIONS,
  SEA_TYPE_OPTIONS,
} from "@/modules/booking/constants/seaBooking.constants";
import type { SeaBookingExpenseDetail } from "@/modules/booking/types";
import type { TariffDescription } from "@/modules/masters/tariff-description/types";
import type { VendorAgent } from "@/modules/masters/vendor-agent/types";
import { EditableRecordsTable } from "@/modules/booking/components/dialog/EditableRecordsTable";

function parseDateInput(value: string): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

interface ExpenseRecordsTableProps {
  expenseRows: SeaBookingExpenseDetail[];
  expenseInlineEditingId: string | null;
  expenseInlineEditDraft: SeaBookingExpenseDetail | null;
  expenseTotalInAed: number;
  vendorAgents: VendorAgent[];
  tariffDescriptions: TariffDescription[];
  calendarOpen: Record<string, boolean>;
  setCalendarOpen: Dispatch<SetStateAction<Record<string, boolean>>>;
  onSaveExpenseInlineEdit: () => void;
  onEditExpense: (row: SeaBookingExpenseDetail) => void;
  onCancelExpenseInlineEdit: () => void;
  onDeleteExpense: (rowId: string) => void;
  onExpenseInlineEditField: <K extends keyof SeaBookingExpenseDetail>(
    key: K,
    value: SeaBookingExpenseDetail[K],
  ) => void;
}

export function ExpenseRecordsTable({
  expenseRows,
  expenseInlineEditingId,
  expenseInlineEditDraft,
  expenseTotalInAed,
  vendorAgents,
  tariffDescriptions,
  calendarOpen,
  setCalendarOpen,
  onSaveExpenseInlineEdit,
  onEditExpense,
  onCancelExpenseInlineEdit,
  onDeleteExpense,
  onExpenseInlineEditField,
}: ExpenseRecordsTableProps) {
  return (
    <EditableRecordsTable
      title="Expense Records"
      headers={[
        { label: "Edit", className: "text-center" },
        { label: "Delete", className: "text-center" },
        { label: "Vendor Name" },
        { label: "Charge Description" },
        { label: "Charged Per" },
        { label: "Qty" },
        { label: "Rate" },
        { label: "Currency" },
        { label: "Size" },
        { label: "Type" },
        { label: "Amount" },
        { label: "ExRate" },
        { label: "Invoice No." },
        { label: "Date" },
        { label: "Remarks" },
      ]}
      rowsCount={expenseRows.length}
      emptyText="No expense records added yet."
      emptyColSpan={15}
    >
      <>
        {expenseRows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="text-center">
              {expenseInlineEditingId === row.id ? (
                <Button
                  size="sm"
                  variant="default"
                  onClick={onSaveExpenseInlineEdit}
                >
                  Save
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEditExpense(row)}
                >
                  Edit
                </Button>
              )}
            </TableCell>

            <TableCell className="text-center">
              {expenseInlineEditingId === row.id ? (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onCancelExpenseInlineEdit}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDeleteExpense(row.id)}
                >
                  Delete
                </Button>
              )}
            </TableCell>

            <TableCell>
              {expenseInlineEditingId === row.id && expenseInlineEditDraft ? (
                <Select
                  value={expenseInlineEditDraft.vendorId}
                  onValueChange={(v) =>
                    onExpenseInlineEditField("vendorId", v ?? "")
                  }
                >
                  <SelectTrigger className="h-8 min-w-[150px]">
                    <span>
                      {vendorAgents.find(
                        (x) => x.id === expenseInlineEditDraft.vendorId,
                      )?.vendorName ?? "Select vendor"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {vendorAgents.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.vendorName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                (vendorAgents.find((x) => x.id === row.vendorId)?.vendorName ??
                "-")
              )}
            </TableCell>

            <TableCell>
              {expenseInlineEditingId === row.id && expenseInlineEditDraft ? (
                <Select
                  value={expenseInlineEditDraft.chargeDescriptionId}
                  onValueChange={(v) =>
                    onExpenseInlineEditField("chargeDescriptionId", v ?? "")
                  }
                >
                  <SelectTrigger className="h-8 min-w-[180px]">
                    <span>
                      {tariffDescriptions.find(
                        (x) =>
                          x.id === expenseInlineEditDraft.chargeDescriptionId,
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
              ) : (
                (tariffDescriptions.find(
                  (x) => x.id === row.chargeDescriptionId,
                )?.description ?? "-")
              )}
            </TableCell>

            <TableCell>
              {expenseInlineEditingId === row.id && expenseInlineEditDraft ? (
                <Select
                  value={expenseInlineEditDraft.chargedPer}
                  onValueChange={(v) =>
                    onExpenseInlineEditField(
                      "chargedPer",
                      v as SeaBookingExpenseDetail["chargedPer"],
                    )
                  }
                >
                  <SelectTrigger className="h-8 w-[95px]">
                    <span>{expenseInlineEditDraft.chargedPer}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DOCS">DOCS</SelectItem>
                    <SelectItem value="CONT">CONT</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                row.chargedPer
              )}
            </TableCell>

            <TableCell>
              {expenseInlineEditingId === row.id && expenseInlineEditDraft ? (
                <Input
                  type="number"
                  min={1}
                  value={expenseInlineEditDraft.qty}
                  onChange={(e) =>
                    onExpenseInlineEditField("qty", Number(e.target.value || 0))
                  }
                  className="h-8 w-20"
                />
              ) : (
                row.qty
              )}
            </TableCell>

            <TableCell>
              {expenseInlineEditingId === row.id && expenseInlineEditDraft ? (
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={expenseInlineEditDraft.rate}
                  onChange={(e) =>
                    onExpenseInlineEditField(
                      "rate",
                      Number(e.target.value || 0),
                    )
                  }
                  className="h-8 w-24"
                />
              ) : (
                row.rate
              )}
            </TableCell>

            <TableCell>
              {expenseInlineEditingId === row.id && expenseInlineEditDraft ? (
                <Select
                  value={expenseInlineEditDraft.currency}
                  onValueChange={(v) =>
                    onExpenseInlineEditField(
                      "currency",
                      v as SeaBookingExpenseDetail["currency"],
                    )
                  }
                >
                  <SelectTrigger className="h-8 w-[95px]">
                    <span>{expenseInlineEditDraft.currency}</span>
                  </SelectTrigger>
                  <SelectContent>
                    {SEA_CURRENCY_OPTIONS.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                row.currency
              )}
            </TableCell>

            <TableCell>
              {expenseInlineEditingId === row.id && expenseInlineEditDraft ? (
                <Select
                  value={expenseInlineEditDraft.size}
                  onValueChange={(v) =>
                    onExpenseInlineEditField(
                      "size",
                      v as SeaBookingExpenseDetail["size"],
                    )
                  }
                >
                  <SelectTrigger className="h-8 w-[90px]">
                    <span>{expenseInlineEditDraft.size}</span>
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
              {expenseInlineEditingId === row.id && expenseInlineEditDraft ? (
                <Select
                  value={expenseInlineEditDraft.type}
                  onValueChange={(v) =>
                    onExpenseInlineEditField(
                      "type",
                      v as SeaBookingExpenseDetail["type"],
                    )
                  }
                >
                  <SelectTrigger className="h-8 w-[100px]">
                    <span>{expenseInlineEditDraft.type}</span>
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

            <TableCell>{row.amount}</TableCell>

            <TableCell>
              {expenseInlineEditingId === row.id && expenseInlineEditDraft ? (
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={expenseInlineEditDraft.exRate}
                  onChange={(e) =>
                    onExpenseInlineEditField(
                      "exRate",
                      Number(e.target.value || 0),
                    )
                  }
                  className="h-8 w-24"
                />
              ) : (
                row.exRate
              )}
            </TableCell>

            <TableCell>
              {expenseInlineEditingId === row.id && expenseInlineEditDraft ? (
                <Input
                  value={expenseInlineEditDraft.invoiceNo}
                  onChange={(e) =>
                    onExpenseInlineEditField("invoiceNo", e.target.value)
                  }
                  className="h-8 min-w-[160px]"
                />
              ) : (
                row.invoiceNo || "-"
              )}
            </TableCell>

            <TableCell>
              {expenseInlineEditingId === row.id && expenseInlineEditDraft ? (
                <Popover
                  open={Boolean(calendarOpen[`inline-expense-${row.id}-date`])}
                  onOpenChange={(isOpen) =>
                    setCalendarOpen((prev) => ({
                      ...prev,
                      [`inline-expense-${row.id}-date`]: isOpen,
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
                    {expenseInlineEditDraft.date
                      ? format(
                          parseDateInput(expenseInlineEditDraft.date) ??
                            new Date(expenseInlineEditDraft.date),
                          "dd-MM-yyyy",
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
                      selected={parseDateInput(expenseInlineEditDraft.date)}
                      onSelect={(date) => {
                        onExpenseInlineEditField(
                          "date",
                          date ? format(date, "yyyy-MM-dd") : "",
                        );
                        if (date) {
                          setCalendarOpen((prev) => ({
                            ...prev,
                            [`inline-expense-${row.id}-date`]: false,
                          }));
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              ) : row.date ? (
                format(
                  parseDateInput(row.date) ?? new Date(row.date),
                  "dd-MM-yyyy",
                )
              ) : (
                "-"
              )}
            </TableCell>

            <TableCell>
              {expenseInlineEditingId === row.id && expenseInlineEditDraft ? (
                <Input
                  value={expenseInlineEditDraft.remarks}
                  onChange={(e) =>
                    onExpenseInlineEditField("remarks", e.target.value)
                  }
                  className="h-8 min-w-[160px]"
                />
              ) : (
                row.remarks || "-"
              )}
            </TableCell>
          </TableRow>
        ))}
        <TableRow className="bg-muted/40 font-semibold">
          <TableCell colSpan={10} className="text-right">
            Total in AED
          </TableCell>
          <TableCell>{expenseTotalInAed.toFixed(2)}</TableCell>
          <TableCell colSpan={4} />
        </TableRow>
      </>
    </EditableRecordsTable>
  );
}
