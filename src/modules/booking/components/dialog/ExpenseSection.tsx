import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
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
  SEA_CURRENCY_OPTIONS,
  SEA_SIZE_OPTIONS,
  SEA_TYPE_OPTIONS,
} from "@/modules/booking/constants/seaBooking.constants";
import type { SeaBookingExpenseDetail } from "@/modules/booking/types";
import type { TariffDescription } from "@/modules/masters/tariff-description/types";
import type { VendorAgent } from "@/modules/masters/vendor-agent/types";
import { Field } from "@/modules/booking/components/dialog/Field";
import type { SeaBookingExpenseDetailForm } from "@/modules/booking/components/dialog/sectionTypes";

function parseDateInput(value: string): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

interface ExpenseSectionProps {
  expenseForm: SeaBookingExpenseDetailForm;
  expenseRows: SeaBookingExpenseDetail[];
  expenseInlineEditingId: string | null;
  expenseInlineEditDraft: SeaBookingExpenseDetail | null;
  expenseTotalInAed: number;
  vendorAgents: VendorAgent[];
  tariffDescriptions: TariffDescription[];
  updateExpenseField: <K extends keyof SeaBookingExpenseDetailForm>(
    key: K,
    value: SeaBookingExpenseDetailForm[K],
  ) => void;
  onClearExpense: () => void;
  onAddOrUpdateExpenseRecord: () => void;
  onEditExpense: (row: SeaBookingExpenseDetail) => void;
  onCancelExpenseInlineEdit: () => void;
  onSaveExpenseInlineEdit: () => void;
  onDeleteExpense: (rowId: string) => void;
  onExpenseInlineEditField: <K extends keyof SeaBookingExpenseDetail>(
    key: K,
    value: SeaBookingExpenseDetail[K],
  ) => void;
}

export function ExpenseSection({
  expenseForm,
  expenseRows,
  expenseInlineEditingId,
  expenseInlineEditDraft,
  expenseTotalInAed,
  vendorAgents,
  tariffDescriptions,
  updateExpenseField,
  onClearExpense,
  onAddOrUpdateExpenseRecord,
  onEditExpense,
  onCancelExpenseInlineEdit,
  onSaveExpenseInlineEdit,
  onDeleteExpense,
  onExpenseInlineEditField,
}: ExpenseSectionProps) {
  const [calendarOpen, setCalendarOpen] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-3 rounded-lg border border-border bg-background p-3">
      <h3 className="text-sm font-semibold">Expense Details</h3>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Field label="Vendor Name">
          <Select
            value={expenseForm.vendorName}
            onValueChange={(v) => updateExpenseField("vendorName", v ?? "")}
          >
            <SelectTrigger className="w-full">
              <span>
                {vendorAgents.find((x) => x.id === expenseForm.vendorName)
                  ?.vendorName ?? "Select vendor"}
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
        </Field>

        <Field label="Charge Description">
          <Select
            value={expenseForm.chargeDescription}
            onValueChange={(v) =>
              updateExpenseField("chargeDescription", v ?? "")
            }
          >
            <SelectTrigger className="w-full">
              <span>
                {tariffDescriptions.find(
                  (x) => x.id === expenseForm.chargeDescription,
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
            value={expenseForm.chargedPer}
            onValueChange={(v) =>
              updateExpenseField(
                "chargedPer",
                v as SeaBookingExpenseDetailForm["chargedPer"],
              )
            }
          >
            <SelectTrigger className="w-full">
              <span>{expenseForm.chargedPer || "Select"}</span>
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
            value={expenseForm.qty}
            onChange={(e) =>
              updateExpenseField("qty", Number(e.target.value || 0))
            }
          />
        </Field>

        <Field label="Rate">
          <Input
            type="number"
            min={0}
            step={0.01}
            value={expenseForm.rate}
            onChange={(e) =>
              updateExpenseField("rate", Number(e.target.value || 0))
            }
          />
        </Field>

        <Field label="Currency">
          <Select
            value={expenseForm.currency}
            onValueChange={(v) =>
              updateExpenseField(
                "currency",
                v as SeaBookingExpenseDetailForm["currency"],
              )
            }
          >
            <SelectTrigger className="w-full">
              <span>{expenseForm.currency || "Select currency"}</span>
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
            value={expenseForm.size}
            onValueChange={(v) =>
              updateExpenseField(
                "size",
                v as SeaBookingExpenseDetailForm["size"],
              )
            }
          >
            <SelectTrigger className="w-full">
              <span>{expenseForm.size || "Select size"}</span>
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
            value={expenseForm.type}
            onValueChange={(v) =>
              updateExpenseField(
                "type",
                v as SeaBookingExpenseDetailForm["type"],
              )
            }
          >
            <SelectTrigger className="w-full">
              <span>{expenseForm.type || "Select type"}</span>
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
          <Input type="number" value={expenseForm.amount} readOnly />
        </Field>

        <Field label="ExRate">
          <Input
            type="number"
            min={0}
            step={0.01}
            value={expenseForm.exRate}
            onChange={(e) =>
              updateExpenseField("exRate", Number(e.target.value || 0))
            }
          />
        </Field>

        <Field label="Invoice No.">
          <Input
            value={expenseForm.invoiceNo}
            onChange={(e) => updateExpenseField("invoiceNo", e.target.value)}
            placeholder="Enter Invoice No"
          />
        </Field>

        <Field label="Date">
          <Popover
            open={Boolean(calendarOpen["expense-form-date"])}
            onOpenChange={(isOpen) =>
              setCalendarOpen((prev) => ({
                ...prev,
                "expense-form-date": isOpen,
              }))
            }
          >
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start px-3 text-left font-normal"
                />
              }
            >
              <CalendarIcon className="mr-2 size-4 text-muted-foreground" />
              {expenseForm.date
                ? format(
                    parseDateInput(expenseForm.date) ??
                      new Date(expenseForm.date),
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
                selected={parseDateInput(expenseForm.date)}
                onSelect={(date) => {
                  updateExpenseField(
                    "date",
                    date ? format(date, "yyyy-MM-dd") : "",
                  );
                  if (date) {
                    setCalendarOpen((prev) => ({
                      ...prev,
                      "expense-form-date": false,
                    }));
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </Field>

        <Field label="Remarks" className="md:col-span-2">
          <Input
            value={expenseForm.remarks}
            onChange={(e) => updateExpenseField("remarks", e.target.value)}
            placeholder="Enter remarks"
          />
        </Field>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" type="button" onClick={onClearExpense}>
          Clear Expense
        </Button>
        <Button type="button" onClick={onAddOrUpdateExpenseRecord}>
          Add Expense Record
        </Button>
      </div>

      <div className="space-y-2 pt-1">
        <div className="text-xs font-medium text-muted-foreground">
          Expense Records
        </div>
        <div className="overflow-x-auto rounded-md border border-border/70 bg-muted/10">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="text-center">Edit</TableHead>
                <TableHead className="text-center">Delete</TableHead>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Charge Description</TableHead>
                <TableHead>Charged Per</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>ExRate</TableHead>
                <TableHead>Invoice No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseRows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={15}
                    className="text-center text-muted-foreground"
                  >
                    No expense records added yet.
                  </TableCell>
                </TableRow>
              ) : (
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
                        {expenseInlineEditingId === row.id &&
                        expenseInlineEditDraft ? (
                          <Select
                            value={expenseInlineEditDraft.vendorName}
                            onValueChange={(v) =>
                              onExpenseInlineEditField("vendorName", v ?? "")
                            }
                          >
                            <SelectTrigger className="h-8 min-w-[150px]">
                              <span>
                                {vendorAgents.find(
                                  (x) =>
                                    x.id === expenseInlineEditDraft.vendorName,
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
                          (vendorAgents.find((x) => x.id === row.vendorName)
                            ?.vendorName ?? "-")
                        )}
                      </TableCell>

                      <TableCell>
                        {expenseInlineEditingId === row.id &&
                        expenseInlineEditDraft ? (
                          <Select
                            value={expenseInlineEditDraft.chargeDescription}
                            onValueChange={(v) =>
                              onExpenseInlineEditField(
                                "chargeDescription",
                                v ?? "",
                              )
                            }
                          >
                            <SelectTrigger className="h-8 min-w-[180px]">
                              <span>
                                {tariffDescriptions.find(
                                  (x) =>
                                    x.id ===
                                    expenseInlineEditDraft.chargeDescription,
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
                            (x) => x.id === row.chargeDescription,
                          )?.description ?? "-")
                        )}
                      </TableCell>

                      <TableCell>
                        {expenseInlineEditingId === row.id &&
                        expenseInlineEditDraft ? (
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
                        {expenseInlineEditingId === row.id &&
                        expenseInlineEditDraft ? (
                          <Input
                            type="number"
                            min={1}
                            value={expenseInlineEditDraft.qty}
                            onChange={(e) =>
                              onExpenseInlineEditField(
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
                        {expenseInlineEditingId === row.id &&
                        expenseInlineEditDraft ? (
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
                        {expenseInlineEditingId === row.id &&
                        expenseInlineEditDraft ? (
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
                        {expenseInlineEditingId === row.id &&
                        expenseInlineEditDraft ? (
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
                        {expenseInlineEditingId === row.id &&
                        expenseInlineEditDraft ? (
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
                        {expenseInlineEditingId === row.id &&
                        expenseInlineEditDraft ? (
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
                        {expenseInlineEditingId === row.id &&
                        expenseInlineEditDraft ? (
                          <Input
                            value={expenseInlineEditDraft.invoiceNo}
                            onChange={(e) =>
                              onExpenseInlineEditField(
                                "invoiceNo",
                                e.target.value,
                              )
                            }
                            className="h-8 min-w-[160px]"
                          />
                        ) : (
                          row.invoiceNo || "-"
                        )}
                      </TableCell>

                      <TableCell>
                        {expenseInlineEditingId === row.id &&
                        expenseInlineEditDraft ? (
                          <Popover
                            open={Boolean(
                              calendarOpen[`inline-expense-${row.id}-date`],
                            )}
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
                                    parseDateInput(
                                      expenseInlineEditDraft.date,
                                    ) ?? new Date(expenseInlineEditDraft.date),
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
                                selected={parseDateInput(
                                  expenseInlineEditDraft.date,
                                )}
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
                        {expenseInlineEditingId === row.id &&
                        expenseInlineEditDraft ? (
                          <Input
                            value={expenseInlineEditDraft.remarks}
                            onChange={(e) =>
                              onExpenseInlineEditField(
                                "remarks",
                                e.target.value,
                              )
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
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
