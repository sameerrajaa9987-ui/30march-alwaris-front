import { ResourceListPage } from "@/modules/common/shared-crud/ResourceListPage";
import { VesselDialog } from "@/modules/masters/vessel/components/VesselDialog";
import { useDeleteVessel, useVessels } from "@/modules/masters/vessel/hooks";

export function VesselListPage() {
  return (
    <ResourceListPage
      title="Vessel"
      subtitle="Manage vessel master data."
      newButtonText="New Vessel"
      searchPlaceholder="Search vessel name..."
      minTableWidth="min-w-[600px]"
      emptyText="No vessels found."
      deleteConfirmText="Delete this vessel?"
      defaultSortBy="createdAt"
      columns={[
        {
          header: "Vessel Name",
          getValue: (item) => item.vesselName,
          valueClassName: "font-medium",
        },
      ]}
      getIdValue={(item) => item.code}
      useList={useVessels}
      useDelete={useDeleteVessel}
      renderDialog={({ open, onOpenChange, mode, value, onSuccess }) => (
        <VesselDialog
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
