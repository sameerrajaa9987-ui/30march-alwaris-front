import type { Shipment } from "@/modules/masters/shipment/types";
import type { MasterDialogField } from "@/modules/masters/shared/MasterDialog";

export const SHIPMENT_DIALOG_FIELDS: Array<
  MasterDialogField<Shipment, "shipmentType">
> = [
  {
    key: "shipmentType",
    label: "Shipment Type",
    placeholder: "Enter Shipment Type",
    requiredMessage: "Shipment Type is required",
    getInitialValue: (item) => item.shipmentType,
  },
];
