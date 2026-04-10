import { ResourceListPage } from "@/modules/common/shared-crud/ResourceListPage";
import { CustomerTypeDialog } from "@/modules/masters/customer/components/CustomerTypeDialog";
import {
  useCustomerTypes,
  useDeleteCustomerType,
} from "@/modules/masters/customer/hooks";
import type { CustomerType } from "@/modules/masters/customer/types";

export function CustomerTypePage() {
  return (
    <ResourceListPage<
      CustomerType,
      {
        search?: string;
        page: number;
        limit: number;
        sortBy: "createdAt" | "customerType";
        sortDir: "asc" | "desc";
      }
    >
      title="Customer Type"
      subtitle="Manage customer type master data."
      newButtonText="New Customer Type"
      searchPlaceholder="Search customer type..."
      minTableWidth="min-w-[600px]"
      emptyText="No customer types found."
      deleteConfirmText="Delete this customer type?"
      defaultSortBy="createdAt"
      columns={[
        {
          header: "Customer Type",
          getValue: (item) => item.customerType,
          valueClassName: "font-medium",
        },
      ]}
      getIdValue={(item) => item.code}
      useList={
        useCustomerTypes as (query: {
          search?: string;
          page: number;
          limit: number;
          sortBy: "createdAt" | "customerType";
          sortDir: "asc" | "desc";
        }) => {
          data?: { items: CustomerType[]; total: number };
          isLoading: boolean;
          error: unknown;
          refetch: () => Promise<unknown>;
        }
      }
      useDelete={useDeleteCustomerType}
      renderDialog={({ open, onOpenChange, mode, value, onSuccess }) => (
        <CustomerTypeDialog
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
