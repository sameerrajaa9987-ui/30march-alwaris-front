import { useState } from "react";
import { ResourceListPage } from "@/modules/common/shared-crud/ResourceListPage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CustomerDialog } from "@/modules/masters/customer/components/CustomerDialog";
import {
  useCustomers,
  useDeleteCustomer,
  useCustomerTypes,
} from "@/modules/masters/customer/hooks";
import type { Customer } from "@/modules/masters/customer/types";

const ALL_CUSTOMER_TYPES = "__all__";

export function CustomerListPage() {
  const [selectedCustomerType, setSelectedCustomerType] = useState("");

  const customerTypeQuery = {
    page: 1,
    limit: 200,
    sortBy: "customerType" as const,
    sortDir: "asc" as const,
  };

  const customerTypesRes = useCustomerTypes(customerTypeQuery);
  const customerTypes = customerTypesRes.data?.items ?? [];

  const selectedCustomerTypeLabel = customerTypes.find(
    (t) => t.id === selectedCustomerType,
  )?.customerType;

  return (
    <ResourceListPage<
      Customer,
      {
        search?: string;
        customerTypeId?: string;
        page: number;
        limit: number;
        sortBy: "createdAt";
        sortDir: "desc";
      }
    >
      title="Customer Details"
      subtitle="Manage customer master records."
      newButtonText="New Customer"
      minTableWidth="min-w-[2000px]"
      emptyText="No customers found."
      deleteConfirmText="Delete this customer?"
      defaultSortBy="createdAt"
      hideIdColumn
      disableCreate={customerTypes.length === 0}
      buildQuery={({ search }) => ({
        search: search.trim() || undefined,
        customerTypeId: selectedCustomerType || undefined,
        page: 1,
        limit: 50,
        sortBy: "createdAt",
        sortDir: "desc",
      })}
      renderFilters={({ search, setSearch }) => (
        <>
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
              <div className="md:col-span-8">
                <label className="text-xs font-medium text-muted-foreground">
                  Search
                </label>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Code, Customer Name, Email, City, State, Contact..."
                />
              </div>
              <div className="md:col-span-4">
                <label className="text-xs font-medium text-muted-foreground">
                  Customer Type
                </label>
                <Select
                  value={selectedCustomerType || ALL_CUSTOMER_TYPES}
                  onValueChange={(value) =>
                    setSelectedCustomerType(
                      value && value !== ALL_CUSTOMER_TYPES ? value : "",
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <span
                      className={
                        selectedCustomerTypeLabel ? "" : "text-muted-foreground"
                      }
                    >
                      {selectedCustomerTypeLabel ?? "All customer types"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_CUSTOMER_TYPES}>All</SelectItem>
                    {customerTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.customerType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {customerTypesRes.error ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {customerTypesRes.error instanceof Error
                ? customerTypesRes.error.message
                : "Failed to load customer types"}
            </div>
          ) : null}
        </>
      )}
      columns={[
        {
          header: "Customer Type",
          getValue: (item) => item.customerType || "-",
        },
        {
          header: "Code",
          getValue: (item) => item.code,
          valueClassName: "font-mono",
        },
        {
          header: "Customer Name",
          getValue: (item) => item.customerName,
          valueClassName: "font-medium",
        },
        { header: "City", getValue: (item) => item.city },
        { header: "Pincode", getValue: (item) => item.pincode },
        { header: "State", getValue: (item) => item.state },
        { header: "Country", getValue: (item) => item.country },
        { header: "Contact Person", getValue: (item) => item.contactPerson },
        { header: "Contact No", getValue: (item) => item.contactNo },
        {
          header: "Email",
          getValue: (item) => item.emailId,
          valueClassName: "max-w-[220px] truncate",
        },
        {
          header: "Additional Emails",
          getValue: (item) => item.additionalEmailIds?.join(", ") || "",
          valueClassName: "max-w-[240px] truncate",
        },
        { header: "GST No", getValue: (item) => item.gstVatNo || "" },
        { header: "Credit Days", getValue: (item) => item.creditDays },
        { header: "PAN No", getValue: (item) => item.panNo || "" },
        { header: "Mail", getValue: (item) => (item.mail === "Y" ? "Y" : "N") },
      ]}
      getIdValue={(item) => item.id}
      useList={
        useCustomers as (query: {
          search?: string;
          customerTypeId?: string;
          page: number;
          limit: number;
          sortBy: "createdAt";
          sortDir: "desc";
        }) => {
          data?: { items: Customer[]; total: number };
          isLoading: boolean;
          error: unknown;
          refetch: () => Promise<unknown>;
        }
      }
      useDelete={useDeleteCustomer}
      renderDialog={({ open, onOpenChange, mode, value, onSuccess }) => (
        <CustomerDialog
          open={open}
          onOpenChange={onOpenChange}
          mode={mode}
          value={value}
          customerTypes={customerTypes}
          onSuccess={onSuccess}
        />
      )}
    />
  );
}
