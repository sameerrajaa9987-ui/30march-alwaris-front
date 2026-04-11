import { useState } from "react";
import { ResourceListPage } from "@/modules/common/shared-crud/ResourceListPage";
import { BillOfLadingDialog } from "@/modules/bill-of-lading/components/BillOfLadingDialog";
import { BillOfLadingFilters } from "@/modules/bill-of-lading/components/BillOfLadingFilters";
import { buildBillOfLadingTableQuery } from "@/modules/bill-of-lading/constants/billOfLading.queries";
import {
  useBillOfLading,
  useDeleteBillOfLading,
} from "@/modules/bill-of-lading/hooks/useBillOfLading";
import type {
  BillOfLading,
  BillOfLadingFiltersValue,
  BillOfLadingTableQuery,
} from "@/modules/bill-of-lading/types";

export function BillOfLadingListPage() {
  const [filters, setFilters] = useState<BillOfLadingFiltersValue>({
    search: "",
  });

  return (
    <ResourceListPage<BillOfLading, BillOfLadingTableQuery>
      title="Bill of Lading"
      subtitle="Manage House Bill of Lading records."
      newButtonText="Create HBL"
      minTableWidth="min-w-[1100px]"
      emptyText="No bill of lading records found."
      deleteConfirmText="Delete this HBL record?"
      defaultSortBy="createdAt"
      hideIdColumn
      buildQuery={({ search, page, limit }) =>
        buildBillOfLadingTableQuery({
          search,
          filtersSearch: filters.search,
          page,
          limit,
        })
      }
      renderFilters={() => (
        <BillOfLadingFilters
          value={filters}
          onChange={(next) => {
            setFilters(next);
          }}
        />
      )}
      columns={[
        {
          header: "HBL No",
          getValue: (item) => item.hblNo,
          valueClassName: "font-mono",
        },
        {
          header: "BL Number",
          getValue: (item) => item.blNumber,
          valueClassName: "font-medium",
        },
        {
          header: "Job No",
          getValue: (item) => item.jobNo,
          valueClassName: "font-mono",
        },
        {
          header: "Reference No",
          getValue: (item) => item.referenceNo,
          valueClassName: "font-mono",
        },
        {
          header: "Status",
          getValue: (item) => item.status,
        },
        {
          header: "Shipper",
          getValue: (item) => item.consignmentDetails.shipper || "-",
        },
        {
          header: "Consignee",
          getValue: (item) => item.consignmentDetails.consignee || "-",
        },
        {
          header: "Containers",
          getValue: (item) => item.containerDetails.length,
        },
      ]}
      getIdValue={(item) => item.id}
      useList={useBillOfLading}
      useDelete={useDeleteBillOfLading}
      renderDialog={({ open, onOpenChange, mode, value, onSuccess }) => (
        <BillOfLadingDialog
          key={`${mode}-${value?.id ?? "new"}-${open ? "open" : "closed"}`}
          open={open}
          onOpenChange={onOpenChange}
          mode={mode}
          value={value}
          onSuccess={onSuccess}
        />
      )}
    />
  );
}
