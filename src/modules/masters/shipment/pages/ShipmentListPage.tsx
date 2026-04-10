import { ResourceListPage } from "@/modules/common/shared-crud/ResourceListPage";
import { ShipmentDialog } from "@/modules/masters/shipment/components/ShipmentDialog";
import {
  useDeleteShipment,
  useShipments,
} from "@/modules/masters/shipment/hooks";

export function ShipmentListPage() {
  return (
    <ResourceListPage
      title="Shipment"
      subtitle="Manage shipment master data."
      newButtonText="New Shipment Type"
      searchPlaceholder="Search shipment type..."
      minTableWidth="min-w-[620px]"
      emptyText="No shipments found."
      deleteConfirmText="Delete this shipment type?"
      defaultSortBy="createdAt"
      columns={[
        {
          header: "Shipment",
          getValue: (item) => item.shipmentType,
          valueClassName: "font-medium",
        },
      ]}
      getIdValue={(item) => item.code}
      useList={useShipments}
      useDelete={useDeleteShipment}
      renderDialog={({ open, onOpenChange, mode, value, onSuccess }) => (
        <ShipmentDialog
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
