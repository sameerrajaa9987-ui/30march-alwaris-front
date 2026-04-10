import type { Vessel } from "@/modules/masters/vessel/types";
import type { ResourceDialogField } from "@/modules/common/shared-crud/ResourceDialog";

export const VESSEL_DIALOG_FIELDS: Array<
  ResourceDialogField<Vessel, "vesselName">
> = [
  {
    key: "vesselName",
    label: "Vessel Name",
    placeholder: "Enter Vessel Name",
    requiredMessage: "Vessel Name is required",
    getInitialValue: (item) => item.vesselName,
  },
];
