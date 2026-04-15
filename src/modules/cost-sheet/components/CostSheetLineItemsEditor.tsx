import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CostSheetLineItem } from "@/modules/cost-sheet/types";

function formatAmount(value: number) {
  return Number(value || 0).toFixed(2);
}

interface CostSheetLineItemsEditorProps {
  activeTab: "income" | "expense";
  setActiveTab: (tab: "income" | "expense") => void;
  incomeRows: CostSheetLineItem[];
  expenseRows: CostSheetLineItem[];
  editingIncomeId: string | null;
  editingExpenseId: string | null;
  onStartIncomeEdit: (row: CostSheetLineItem) => void;
  onSaveIncomeEdit: () => void;
  onCancelIncomeEdit: () => void;
  onStartExpenseEdit: (row: CostSheetLineItem) => void;
  onSaveExpenseEdit: () => void;
  onCancelExpenseEdit: () => void;
  updateIncomeRow: (
    rowId: string,
    field: "qty" | "rate" | "remarks",
    value: string,
  ) => void;
  updateExpenseRow: (
    rowId: string,
    field: "qty" | "rate" | "remarks",
    value: string,
  ) => void;
}

export function CostSheetLineItemsEditor({
  activeTab,
  setActiveTab,
  incomeRows,
  expenseRows,
  editingIncomeId,
  editingExpenseId,
  onStartIncomeEdit,
  onSaveIncomeEdit,
  onCancelIncomeEdit,
  onStartExpenseEdit,
  onSaveExpenseEdit,
  onCancelExpenseEdit,
  updateIncomeRow,
  updateExpenseRow,
}: CostSheetLineItemsEditorProps) {
  return (
    <section className="space-y-3 rounded-xl border border-border/70 bg-card p-4 shadow-sm">
      <div className="inline-flex rounded-lg border border-border p-1">
        <Button
          type="button"
          variant={activeTab === "income" ? "secondary" : "ghost"}
          onClick={() => setActiveTab("income")}
          className="h-8"
        >
          Income
        </Button>
        <Button
          type="button"
          variant={activeTab === "expense" ? "secondary" : "ghost"}
          onClick={() => setActiveTab("expense")}
          className="h-8"
        >
          Expense
        </Button>
      </div>

      <div className="overflow-auto rounded-lg border border-border">
        {activeTab === "income" ? (
          <Table className="min-w-[1200px]">
            <TableHeader>
              <TableRow>
                <TableHead>Edit</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>CT</TableHead>
                <TableHead>EqpType</TableHead>
                <TableHead>Charges</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Remark</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomeRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12}>No income rows available</TableCell>
                </TableRow>
              ) : (
                incomeRows.map((row) => {
                  const isEditing = editingIncomeId === row.id;

                  return (
                    <TableRow key={row.id}>
                      <TableCell>
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={onSaveIncomeEdit}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={onCancelIncomeEdit}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onStartIncomeEdit(row)}
                          >
                            Edit
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>{row.chargeDescriptionName || "-"}</TableCell>
                      <TableCell>{row.billingPartyName || "-"}</TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            type="number"
                            min={0}
                            className="h-8 w-20"
                            value={row.qty}
                            onChange={(e) =>
                              updateIncomeRow(row.id, "qty", e.target.value)
                            }
                          />
                        ) : (
                          row.qty
                        )}
                      </TableCell>
                      <TableCell>{row.size || "-"}</TableCell>
                      <TableCell>{row.type || "-"}</TableCell>
                      <TableCell>{row.chargeDescriptionCode || "-"}</TableCell>
                      <TableCell>{row.currency || "-"}</TableCell>
                      <TableCell>{row.chargedPer || "-"}</TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            type="number"
                            min={0}
                            step={0.01}
                            className="h-8 w-24"
                            value={row.rate}
                            onChange={(e) =>
                              updateIncomeRow(row.id, "rate", e.target.value)
                            }
                          />
                        ) : (
                          formatAmount(row.rate)
                        )}
                      </TableCell>
                      <TableCell>{formatAmount(row.amount)}</TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            className="h-8 min-w-[180px]"
                            value={row.remarks || ""}
                            onChange={(e) =>
                              updateIncomeRow(row.id, "remarks", e.target.value)
                            }
                          />
                        ) : (
                          row.remarks || "-"
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        ) : (
          <Table className="min-w-[1200px]">
            <TableHeader>
              <TableRow>
                <TableHead>Edit</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>CT</TableHead>
                <TableHead>EqpType</TableHead>
                <TableHead>Charges</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Remark</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12}>No expense rows available</TableCell>
                </TableRow>
              ) : (
                expenseRows.map((row) => {
                  const isEditing = editingExpenseId === row.id;

                  return (
                    <TableRow key={row.id}>
                      <TableCell>
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={onSaveExpenseEdit}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={onCancelExpenseEdit}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onStartExpenseEdit(row)}
                          >
                            Edit
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>{row.chargeDescriptionName || "-"}</TableCell>
                      <TableCell>{row.vendorName || "-"}</TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            type="number"
                            min={0}
                            className="h-8 w-20"
                            value={row.qty}
                            onChange={(e) =>
                              updateExpenseRow(row.id, "qty", e.target.value)
                            }
                          />
                        ) : (
                          row.qty
                        )}
                      </TableCell>
                      <TableCell>{row.size || "-"}</TableCell>
                      <TableCell>{row.type || "-"}</TableCell>
                      <TableCell>{row.chargeDescriptionCode || "-"}</TableCell>
                      <TableCell>{row.currency || "-"}</TableCell>
                      <TableCell>{row.chargedPer || "-"}</TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            type="number"
                            min={0}
                            step={0.01}
                            className="h-8 w-24"
                            value={row.rate}
                            onChange={(e) =>
                              updateExpenseRow(row.id, "rate", e.target.value)
                            }
                          />
                        ) : (
                          formatAmount(row.rate)
                        )}
                      </TableCell>
                      <TableCell>{formatAmount(row.amount)}</TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            className="h-8 min-w-[180px]"
                            value={row.remarks || ""}
                            onChange={(e) =>
                              updateExpenseRow(
                                row.id,
                                "remarks",
                                e.target.value,
                              )
                            }
                          />
                        ) : (
                          row.remarks || "-"
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
}
