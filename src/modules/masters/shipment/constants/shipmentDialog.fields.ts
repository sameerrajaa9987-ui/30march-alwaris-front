import type { Shipment } from "@/modules/masters/shipment/types";
import type { ResourceDialogField } from "@/modules/common/shared-crud/ResourceDialog";

export const SHIPMENT_DIALOG_FIELDS: Array<
  ResourceDialogField<Shipment, "shipmentType">
> = [
  {
    key: "shipmentType",
    label: "Shipment Type",
    placeholder: "Enter Shipment Type",
    requiredMessage: "Shipment Type is required",
    getInitialValue: (item) => item.shipmentType,
  },
];
