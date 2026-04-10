import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import type { SeaBookingIncomeDetail } from "@/modules/booking/types";
import type { Customer } from "@/modules/masters/customer/types";
import type { TariffDescription } from "@/modules/masters/tariff-description/types";
import { Field } from "@/modules/booking/components/dialog/Field";
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
            value={incomeForm.incomeBillingParty}
            onValueChange={(v) =>
              updateIncomeField("incomeBillingParty", v ?? "")
            }
          >
            <SelectTrigger className="w-full">
              <span>
                {customers.find((x) => x.id === incomeForm.incomeBillingParty)
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
            value={incomeForm.chargeDescription}
            onValueChange={(v) =>
              updateIncomeField("chargeDescription", v ?? "")
            }
          >
            <SelectTrigger className="w-full">
              <span>
                {tariffDescriptions.find(
                  (x) => x.id === incomeForm.chargeDescription,
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

      <div className="space-y-2 pt-1">
        <div className="text-xs font-medium text-muted-foreground">
          Income Records
        </div>
        <div className="overflow-x-auto rounded-md border border-border/70 bg-muted/10">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="text-center">Edit</TableHead>
                <TableHead className="text-center">Delete</TableHead>
                <TableHead>Billing Party</TableHead>
                <TableHead>Charge Description</TableHead>
                <TableHead>Charged Per</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>ExRate</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomeRows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={13}
                    className="text-center text-muted-foreground"
                  >
                    No income records added yet.
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {incomeRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-center">
                        {incomeInlineEditingId === row.id ? (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={onSaveIncomeInlineEdit}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onEditIncome(row)}
                          >
                            Edit
                          </Button>
                        )}
                      </TableCell>

                      <TableCell className="text-center">
                        {incomeInlineEditingId === row.id ? (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={onCancelIncomeInlineEdit}
                          >
                            Cancel
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onDeleteIncome(row.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </TableCell>

                      <TableCell>
                        {incomeInlineEditingId === row.id &&
                        incomeInlineEditDraft ? (
                          <Select
                            value={incomeInlineEditDraft.incomeBillingParty}
                            onValueChange={(v) =>
                              onIncomeInlineEditField(
                                "incomeBillingParty",
                                v ?? "",
                              )
                            }
                          >
                            <SelectTrigger className="h-8 min-w-[150px]">
                              <span>
                                {customers.find(
                                  (x) =>
                                    x.id ===
                                    incomeInlineEditDraft.incomeBillingParty,
                                )?.customerName ?? "Select customer"}
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
                        ) : (
                          (customers.find(
                            (x) => x.id === row.incomeBillingParty,
                          )?.customerName ?? "-")
                        )}
                      </TableCell>

                      <TableCell>
                        {incomeInlineEditingId === row.id &&
                        incomeInlineEditDraft ? (
                          <Select
                            value={incomeInlineEditDraft.chargeDescription}
                            onValueChange={(v) =>
                              onIncomeInlineEditField(
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
                                    incomeInlineEditDraft.chargeDescription,
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
                        {incomeInlineEditingId === row.id &&
                        incomeInlineEditDraft ? (
                          <Select
                            value={incomeInlineEditDraft.chargedPer}
                            onValueChange={(v) =>
                              onIncomeInlineEditField(
                                "chargedPer",
                                v as SeaBookingIncomeDetail["chargedPer"],
                              )
                            }
                          >
                            <SelectTrigger className="h-8 w-[95px]">
                              <span>{incomeInlineEditDraft.chargedPer}</span>
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
                        {incomeInlineEditingId === row.id &&
                        incomeInlineEditDraft ? (
                          <Input
                            type="number"
                            min={1}
                            value={incomeInlineEditDraft.qty}
                            onChange={(e) =>
                              onIncomeInlineEditField(
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
                        {incomeInlineEditingId === row.id &&
                        incomeInlineEditDraft ? (
                          <Input
                            type="number"
                            min={0}
                            step={0.01}
                            value={incomeInlineEditDraft.rate}
                            onChange={(e) =>
                              onIncomeInlineEditField(
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
                        {incomeInlineEditingId === row.id &&
                        incomeInlineEditDraft ? (
                          <Select
                            value={incomeInlineEditDraft.currency}
                            onValueChange={(v) =>
                              onIncomeInlineEditField(
                                "currency",
                                v as SeaBookingIncomeDetail["currency"],
                              )
                            }
                          >
                            <SelectTrigger className="h-8 w-[95px]">
                              <span>{incomeInlineEditDraft.currency}</span>
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
                        {incomeInlineEditingId === row.id &&
                        incomeInlineEditDraft ? (
                          <Select
                            value={incomeInlineEditDraft.size}
                            onValueChange={(v) =>
                              onIncomeInlineEditField(
                                "size",
                                v as SeaBookingIncomeDetail["size"],
                              )
                            }
                          >
                            <SelectTrigger className="h-8 w-[90px]">
                              <span>{incomeInlineEditDraft.size}</span>
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
                        {incomeInlineEditingId === row.id &&
                        incomeInlineEditDraft ? (
                          <Select
                            value={incomeInlineEditDraft.type}
                            onValueChange={(v) =>
                              onIncomeInlineEditField(
                                "type",
                                v as SeaBookingIncomeDetail["type"],
                              )
                            }
                          >
                            <SelectTrigger className="h-8 w-[100px]">
                              <span>{incomeInlineEditDraft.type}</span>
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
                        {incomeInlineEditingId === row.id &&
                        incomeInlineEditDraft ? (
                          <Input
                            type="number"
                            min={0}
                            step={0.01}
                            value={incomeInlineEditDraft.exRate}
                            onChange={(e) =>
                              onIncomeInlineEditField(
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
                        {incomeInlineEditingId === row.id &&
                        incomeInlineEditDraft ? (
                          <Input
                            value={incomeInlineEditDraft.remarks}
                            onChange={(e) =>
                              onIncomeInlineEditField("remarks", e.target.value)
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
                    <TableCell>{incomeTotalInAed.toFixed(2)}</TableCell>
                    <TableCell colSpan={2} />
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
