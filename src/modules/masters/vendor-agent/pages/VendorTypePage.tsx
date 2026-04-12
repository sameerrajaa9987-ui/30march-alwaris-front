import { ResourceListPage } from "@/modules/common/shared-crud/ResourceListPage";
import { VendorTypeDialog } from "@/modules/masters/vendor-agent/components/VendorTypeDialog";
import {
  useVendorTypes,
  useDeleteVendorType,
} from "@/modules/masters/vendor-agent/hooks";
import type { VendorType } from "@/modules/masters/vendor-agent/types";

export function VendorTypePage() {
  return (
    <ResourceListPage<
      VendorType,
      {
        search?: string;
        page: number;
        limit: number;
        sortBy: "createdAt" | "vendorType";
        sortDir: "asc" | "desc";
      }
    >
      title="Vendor Type"
      subtitle="Manage vendor type master data."
      newButtonText="New Vendor Type"
      searchPlaceholder="Search vendor type..."
      minTableWidth="min-w-[600px]"
      emptyText="No vendor types found."
      deleteConfirmText="Delete this vendor type?"
      defaultSortBy="createdAt"
      columns={[
        {
          header: "Vendor Type",
          getValue: (item) => item.vendorType,
          valueClassName: "font-medium",
        },
      ]}
      getIdValue={(item) => item.code}
      useList={
        useVendorTypes as (query: {
          search?: string;
          page: number;
          limit: number;
          sortBy: "createdAt" | "vendorType";
          sortDir: "asc" | "desc";
        }) => {
          data?: {
            items: VendorType[];
            meta: {
              total: number;
              totalPages: number;
              hasNextPage: boolean;
              hasPrevPage: boolean;
            };
          };
          isLoading: boolean;
          error: unknown;
          refetch: () => Promise<unknown>;
        }
      }
      useDelete={useDeleteVendorType}
      renderDialog={({ open, onOpenChange, mode, value, onSuccess }) => (
        <VendorTypeDialog
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
