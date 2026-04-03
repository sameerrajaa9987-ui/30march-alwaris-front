import { useState } from "react";
import { MasterListPage } from "@/modules/masters/shared/MasterListPage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { VendorAgentDialog } from "@/modules/masters/vendor-agent/components/VendorAgentDialog";
import {
  useVendorAgents,
  useDeleteVendorAgent,
} from "@/modules/masters/vendor-agent/hooks";
import { useCustomerTypes } from "@/modules/masters/customer/hooks";
import type { VendorAgent } from "@/modules/masters/vendor-agent/types";

const ALL_CUSTOMER_TYPES = "__all__";

export function VendorAgentListPage() {
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
    <MasterListPage<
      VendorAgent,
      {
        search?: string;
        customerTypeId?: string;
        page: number;
        limit: number;
        sortBy: "createdAt";
        sortDir: "desc";
      }
    >
      title="Vendor / Agent"
      subtitle="Manage vendor and agent master records."
      newButtonText="New Vendor / Agent"
      minTableWidth="min-w-[2100px]"
      emptyText="No vendor/agent found."
      deleteConfirmText="Delete this vendor / agent?"
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
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Code, Customer Name, Email, City, State, Contact..."
                  className="flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
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
        { header: "Address", getValue: (item) => item.address },
        { header: "City", getValue: (item) => item.city },
        { header: "Country", getValue: (item) => item.country },
        { header: "State", getValue: (item) => item.state },
        { header: "Pincode", getValue: (item) => item.pincode },
        { header: "Contact Person", getValue: (item) => item.contactPerson },
        { header: "Contact No", getValue: (item) => item.contactNo },
        {
          header: "Email ID",
          getValue: (item) => item.emailId,
          valueClassName: "max-w-[220px] truncate",
        },
        {
          header: "Email ID (Multiple)",
          getValue: (item) => item.additionalEmailIds?.join(", ") || "",
          valueClassName: "max-w-[240px] truncate",
        },
        { header: "GST No / VAT No", getValue: (item) => item.gstVatNo || "" },
        { header: "Credit Days", getValue: (item) => item.creditDays },
        { header: "State Code", getValue: (item) => item.stateCode || "" },
        { header: "Pan No.", getValue: (item) => item.panNo || "" },
        { header: "Mail", getValue: (item) => (item.mail === "Y" ? "Y" : "N") },
      ]}
      getIdValue={(item) => item.id}
      useList={
        useVendorAgents as (query: {
          search?: string;
          customerTypeId?: string;
          page: number;
          limit: number;
          sortBy: "createdAt";
          sortDir: "desc";
        }) => {
          data?: { items: VendorAgent[]; total: number };
          isLoading: boolean;
          error: unknown;
          refetch: () => Promise<unknown>;
        }
      }
      useDelete={useDeleteVendorAgent}
      renderDialog={({ open, onOpenChange, mode, value, onSuccess }) => (
        <VendorAgentDialog
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
