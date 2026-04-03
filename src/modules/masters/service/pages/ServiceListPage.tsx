import { MasterListPage } from "@/modules/masters/shared/MasterListPage";
import { ServiceDialog } from "@/modules/masters/service/components/ServiceDialog";
import { useDeleteService, useServices } from "@/modules/masters/service/hooks";

export function ServiceListPage() {
  return (
    <MasterListPage
      title="Service"
      subtitle="Manage service master data."
      newButtonText="New Service Type"
      searchPlaceholder="Search service type..."
      minTableWidth="min-w-[650px]"
      emptyText="No services found."
      deleteConfirmText="Delete this service type?"
      defaultSortBy="createdAt"
      columns={[
        {
          header: "Service Name",
          getValue: (item) => item.serviceType,
          valueClassName: "font-medium",
        },
      ]}
      getIdValue={(item) => item.code}
      useList={useServices}
      useDelete={useDeleteService}
      renderDialog={({ open, onOpenChange, mode, value, onSuccess }) => (
        <ServiceDialog
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
