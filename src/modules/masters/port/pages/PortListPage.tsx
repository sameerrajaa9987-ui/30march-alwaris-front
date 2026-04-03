import { MasterListPage } from "@/modules/masters/shared/MasterListPage";
import { PortDialog } from "@/modules/masters/port/components/PortDialog";
import { useDeletePort, usePorts } from "@/modules/masters/port/hooks";
import type { Port } from "@/modules/masters/port/types";

export function PortListPage() {
  return (
    <MasterListPage<
      Port,
      {
        search?: string;
        page: number;
        limit: number;
        sortBy: "createdAt" | "portName";
        sortDir: "asc" | "desc";
      }
    >
      title="Port"
      subtitle="Manage port master data."
      newButtonText="New Port"
      searchPlaceholder="Search port code or port name..."
      minTableWidth="min-w-[700px]"
      emptyText="No ports found."
      deleteConfirmText="Delete this port?"
      defaultSortBy="createdAt"
      columns={[
        {
          header: "Port Code",
          getValue: (item) => item.portCode,
          valueClassName: "font-medium",
        },
        {
          header: "Port Name",
          getValue: (item) => item.portName,
        },
      ]}
      getIdValue={(item) => item.code}
      useList={
        usePorts as (query: {
          search?: string;
          page: number;
          limit: number;
          sortBy: "createdAt" | "portName";
          sortDir: "asc" | "desc";
        }) => {
          data?: { items: Port[]; total: number };
          isLoading: boolean;
          error: unknown;
          refetch: () => Promise<unknown>;
        }
      }
      useDelete={useDeletePort}
      renderDialog={({ open, onOpenChange, mode, value, onSuccess }) => (
        <PortDialog
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
