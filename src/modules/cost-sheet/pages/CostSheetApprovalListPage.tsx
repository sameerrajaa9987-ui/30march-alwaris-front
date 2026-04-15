import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResourceListPage } from "@/modules/common/shared-crud/ResourceListPage";
import { CostSheetApprovalFilters } from "@/modules/cost-sheet/components/CostSheetApprovalFilters";
import { useCostSheetApprovalList } from "@/modules/cost-sheet/hooks/useCostSheet";
import type {
  CostSheetListQuery,
  CostSheetLineItem,
  CostSheetRecord,
} from "@/modules/cost-sheet/types";
import type { CostSheetApprovalFiltersValue } from "@/modules/cost-sheet/components/CostSheetApprovalFilters";

function formatDate(value?: string) {
  if (!value) return "-";
  return value.split("T")[0] ?? value;
}

function formatNumber(value: number) {
  return Number(value || 0).toFixed(2);
}

function TotalsInlineField({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[160px_1fr] items-center gap-2">
      <div className="text-sm font-medium">{label} :</div>
      <Input readOnly value={value} />
    </div>
  );
}

export function CostSheetApprovalListPage() {
  const [filters, setFilters] = useState<CostSheetApprovalFiltersValue>({
    search: "",
  });
  const [selectedRecord, setSelectedRecord] = useState<CostSheetRecord | null>(
    null,
  );
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"income" | "expense">("income");

  function openDetails(record: CostSheetRecord) {
    setSelectedRecord(record);
    setActiveTab("income");
    setDetailsOpen(true);
  }

  function renderDetailRows(
    rows: CostSheetLineItem[],
    type: "income" | "expense",
  ) {
    if (rows.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={11}>No {type} rows available.</TableCell>
        </TableRow>
      );
    }

    return rows.map((row, index) => (
      <TableRow key={`${type}-${index}-${row.chargeDescriptionCode}`}>
        <TableCell>{row.chargeDescriptionName || "-"}</TableCell>
        <TableCell>
          {type === "income"
            ? row.billingPartyName || "-"
            : row.vendorName || "-"}
        </TableCell>
        <TableCell>{row.qty}</TableCell>
        <TableCell>{row.size || "-"}</TableCell>
        <TableCell>{row.type || "-"}</TableCell>
        <TableCell>{row.chargeDescriptionCode || "-"}</TableCell>
        <TableCell>{row.currency || "-"}</TableCell>
        <TableCell>{row.chargedPer || "-"}</TableCell>
        <TableCell>{formatNumber(row.rate)}</TableCell>
        <TableCell>{formatNumber(row.amount)}</TableCell>
        <TableCell>{row.remarks || "-"}</TableCell>
      </TableRow>
    ));
  }

  return (
    <>
      <ResourceListPage<CostSheetRecord, CostSheetListQuery>
        title="Cost Sheet Approval"
        subtitle="Pending approval records."
        minTableWidth="min-w-[1300px]"
        emptyText="No pending approval records found."
        defaultSortBy="createdAt"
        hideCreateButton
        hideActionsColumn
        hideIdColumn
        buildQuery={({ page, limit }) => ({
          search: filters.search.trim() || undefined,
          status: "Pending Approval",
          page,
          limit,
          sortBy: "createdAt",
          sortDir: "desc",
        })}
        renderFilters={() => (
          <CostSheetApprovalFilters
            value={filters}
            onChange={(next) => setFilters(next)}
          />
        )}
        columns={[
          {
            header: "View",
            getValue: (item) => (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => openDetails(item)}
              >
                View
              </Button>
            ),
          },
          {
            header: "Job No.",
            getValue: (item) => item.jobNo,
            valueClassName: "font-mono",
          },
          { header: "Customer", getValue: (item) => item.bookingParty || "-" },
          { header: "Shipper", getValue: (item) => item.shipper || "-" },
          { header: "Consignee", getValue: (item) => item.consignee || "-" },
          { header: "POL", getValue: (item) => item.portOfLoading || "-" },
          { header: "POD", getValue: (item) => item.portOfDestination || "-" },
          { header: "ETD", getValue: (item) => formatDate(item.etd) },
          { header: "ETA", getValue: (item) => formatDate(item.eta) },
          { header: "Volume", getValue: (item) => formatNumber(item.volume) },
          {
            header: "Weight",
            getValue: (item) => formatNumber(item.grossWeight),
          },
          { header: "Qty", getValue: (item) => item.qty },
          { header: "Mode", getValue: (item) => item.modeOfTransport || "-" },
          { header: "Created By", getValue: () => "-" },
          {
            header: "Created Date",
            getValue: (item) => formatDate(item.createdAt),
          },
          { header: "Approved By", getValue: () => "" },
        ]}
        getIdValue={(item) => item.id}
        useList={useCostSheetApprovalList}
      />

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-h-[88vh] w-[calc(100vw-2rem)] sm:max-w-[1050px] overflow-y-auto p-4">
          <DialogHeader>
            <DialogTitle>
              Cost Sheet Approval - Job No. {selectedRecord?.jobNo ?? "-"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
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
              <Table className="min-w-[980px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>
                      {activeTab === "income" ? "Customer" : "Vendor"}
                    </TableHead>
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
                  {activeTab === "income"
                    ? renderDetailRows(
                        selectedRecord?.incomeDetails || [],
                        "income",
                      )
                    : renderDetailRows(
                        selectedRecord?.expenseDetails || [],
                        "expense",
                      )}
                </TableBody>
              </Table>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-background p-3">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <TotalsInlineField
                  label="AED Income"
                  value={formatNumber(selectedRecord?.totals?.aedIncome || 0)}
                />
                <TotalsInlineField
                  label="AED Expense"
                  value={formatNumber(selectedRecord?.totals?.aedExpense || 0)}
                />
                <TotalsInlineField
                  label="AED Profit"
                  value={formatNumber(selectedRecord?.totals?.aedProfit || 0)}
                />
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <TotalsInlineField
                  label="USD Income"
                  value={formatNumber(selectedRecord?.totals?.usdIncome || 0)}
                />
                <TotalsInlineField
                  label="USD Expense"
                  value={formatNumber(selectedRecord?.totals?.usdExpense || 0)}
                />
                <TotalsInlineField
                  label="USD Profit"
                  value={formatNumber(selectedRecord?.totals?.usdProfit || 0)}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
