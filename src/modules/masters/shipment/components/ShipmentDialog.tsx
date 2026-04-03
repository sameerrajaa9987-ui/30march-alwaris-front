import { MasterDialog } from "@/modules/masters/shared/MasterDialog";
import type { Shipment } from "@/modules/masters/shipment/types";
import {
  useCreateShipment,
  useUpdateShipment,
} from "@/modules/masters/shipment/hooks";
import { SHIPMENT_DIALOG_FIELDS } from "@/modules/masters/shipment/components/shipmentDialog.fields";

interface ShipmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  value?: Shipment | null;
  onSuccess?: () => void;
}

export function ShipmentDialog({
  open,
  onOpenChange,
  mode,
  value,
  onSuccess,
}: ShipmentDialogProps) {
  return (
    <MasterDialog<Shipment, Pick<Shipment, "shipmentType">, "shipmentType">
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      value={value}
      onSuccess={onSuccess}
      createTitle="ADD NEW SHIPMENT TYPE"
      editTitle="Edit Shipment Type"
      fields={SHIPMENT_DIALOG_FIELDS}
      toPayload={(values) => ({ shipmentType: values.shipmentType })}
      useCreate={useCreateShipment}
      useUpdate={useUpdateShipment}
    />
  );
}
