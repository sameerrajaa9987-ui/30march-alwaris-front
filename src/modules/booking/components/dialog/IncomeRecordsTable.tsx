import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import type { SeaBookingIncomeDetail } from "@/modules/booking/types";
import type { Customer } from "@/modules/masters/customer/types";
import type { TariffDescription } from "@/modules/masters/tariff-description/types";
import { EditableRecordsTable } from "@/modules/booking/components/dialog/EditableRecordsTable";

interface IncomeRecordsTableProps {
  incomeRows: SeaBookingIncomeDetail[];
  incomeInlineEditingId: string | null;
  incomeInlineEditDraft: SeaBookingIncomeDetail | null;
  incomeTotalInAed: number;
  customers: Customer[];
  tariffDescriptions: TariffDescription[];
  onSaveIncomeInlineEdit: () => void;
  onEditIncome: (row: SeaBookingIncomeDetail) => void;
  onCancelIncomeInlineEdit: () => void;
  onDeleteIncome: (rowId: string) => void;
  onIncomeInlineEditField: <K extends keyof SeaBookingIncomeDetail>(
    key: K,
    value: SeaBookingIncomeDetail[K],
  ) => void;
}

export function IncomeRecordsTable({
  incomeRows,
  incomeInlineEditingId,
  incomeInlineEditDraft,
  incomeTotalInAed,
  customers,
  tariffDescriptions,
  onSaveIncomeInlineEdit,
  onEditIncome,
  onCancelIncomeInlineEdit,
  onDeleteIncome,
  onIncomeInlineEditField,
}: IncomeRecordsTableProps) {
  return (
    <EditableRecordsTable
      title="Income Records"
      headers={[
        { label: "Edit", className: "text-center" },
        { label: "Delete", className: "text-center" },
        { label: "Billing Party" },
        { label: "Charge Description" },
        { label: "Charged Per" },
        { label: "Qty" },
        { label: "Rate" },
        { label: "Currency" },
        { label: "Size" },
        { label: "Type" },
        { label: "Amount" },
        { label: "ExRate" },
        { label: "Remarks" },
      ]}
      rowsCount={incomeRows.length}
      emptyText="No income records added yet."
      emptyColSpan={13}
    >
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
              {incomeInlineEditingId === row.id && incomeInlineEditDraft ? (
                <Select
                  value={incomeInlineEditDraft.incomeBillingPartyId}
                  onValueChange={(v) =>
                    onIncomeInlineEditField("incomeBillingPartyId", v ?? "")
                  }
                >
                  <SelectTrigger className="h-8 min-w-[150px]">
                    <span>
                      {customers.find(
                        (x) =>
                          x.id === incomeInlineEditDraft.incomeBillingPartyId,
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
                (customers.find((x) => x.id === row.incomeBillingPartyId)
                  ?.customerName ?? "-")
              )}
            </TableCell>

            <TableCell>
              {incomeInlineEditingId === row.id && incomeInlineEditDraft ? (
                <Select
                  value={incomeInlineEditDraft.chargeDescriptionId}
                  onValueChange={(v) =>
                    onIncomeInlineEditField("chargeDescriptionId", v ?? "")
                  }
                >
                  <SelectTrigger className="h-8 min-w-[180px]">
                    <span>
                      {tariffDescriptions.find(
                        (x) =>
                          x.id === incomeInlineEditDraft.chargeDescriptionId,
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
              {incomeInlineEditingId === row.id && incomeInlineEditDraft ? (
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
              {incomeInlineEditingId === row.id && incomeInlineEditDraft ? (
                <Input
                  type="number"
                  min={1}
                  value={incomeInlineEditDraft.qty}
                  onChange={(e) =>
                    onIncomeInlineEditField("qty", Number(e.target.value || 0))
                  }
                  className="h-8 w-20"
                />
              ) : (
                row.qty
              )}
            </TableCell>

            <TableCell>
              {incomeInlineEditingId === row.id && incomeInlineEditDraft ? (
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={incomeInlineEditDraft.rate}
                  onChange={(e) =>
                    onIncomeInlineEditField("rate", Number(e.target.value || 0))
                  }
                  className="h-8 w-24"
                />
              ) : (
                row.rate
              )}
            </TableCell>

            <TableCell>
              {incomeInlineEditingId === row.id && incomeInlineEditDraft ? (
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
              {incomeInlineEditingId === row.id && incomeInlineEditDraft ? (
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
              {incomeInlineEditingId === row.id && incomeInlineEditDraft ? (
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
              {incomeInlineEditingId === row.id && incomeInlineEditDraft ? (
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
              {incomeInlineEditingId === row.id && incomeInlineEditDraft ? (
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
    </EditableRecordsTable>
  );
}
