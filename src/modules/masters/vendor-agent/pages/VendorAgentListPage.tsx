import { useState } from "react";
import { ResourceListPage } from "@/modules/common/shared-crud/ResourceListPage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { VendorAgentDialog } from "@/modules/masters/vendor-agent/components/VendorAgentDialog";
import {
  useVendorAgents,
  useDeleteVendorAgent,
  useVendorTypes,
} from "@/modules/masters/vendor-agent/hooks";
import type { VendorAgent } from "@/modules/masters/vendor-agent/types";

const ALL_VENDOR_TYPES = "__all__";

export function VendorAgentListPage() {
  const [selectedVendorType, setSelectedVendorType] = useState("");

  const vendorTypeQuery = {
    page: 1,
    limit: 200,
    sortBy: "vendorType" as const,
    sortDir: "asc" as const,
  };

  const vendorTypesRes = useVendorTypes(vendorTypeQuery);
  const vendorTypes = vendorTypesRes.data?.items ?? [];

  const selectedVendorTypeLabel = vendorTypes.find(
    (t) => t.id === selectedVendorType,
  )?.vendorType;

  return (
    <ResourceListPage<
      VendorAgent,
      {
        search?: string;
        vendorTypeId?: string;
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
      disableCreate={vendorTypes.length === 0}
      buildQuery={({ search }) => ({
        search: search.trim() || undefined,
        vendorTypeId: selectedVendorType || undefined,
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
                  placeholder="Code, Vendor Name, Email, City, State, Contact..."
                />
              </div>
              <div className="md:col-span-4">
                <label className="text-xs font-medium text-muted-foreground">
                  Vendor Type
                </label>
                <Select
                  value={selectedVendorType || ALL_VENDOR_TYPES}
                  onValueChange={(value) =>
                    setSelectedVendorType(
                      value && value !== ALL_VENDOR_TYPES ? value : "",
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <span
                      className={
                        selectedVendorTypeLabel ? "" : "text-muted-foreground"
                      }
                    >
                      {selectedVendorTypeLabel ?? "All vendor types"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_VENDOR_TYPES}>All</SelectItem>
                    {vendorTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.vendorType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {vendorTypesRes.error ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {vendorTypesRes.error instanceof Error
                ? vendorTypesRes.error.message
                : "Failed to load vendor types"}
            </div>
          ) : null}
        </>
      )}
      columns={[
        {
          header: "Vendor Type",
          getValue: (item) => item.vendorType || "-",
        },
        {
          header: "Code",
          getValue: (item) => item.code,
          valueClassName: "font-mono",
        },
        {
          header: "Vendor Name",
          getValue: (item) => item.vendorName,
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
          vendorTypeId?: string;
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
          vendorTypes={vendorTypes}
          onSuccess={onSuccess}
        />
      )}
    />
  );
}
